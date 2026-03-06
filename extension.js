const vscode = require("vscode");
const path = require("path");
const { execFile } = require("child_process");

// Track already-alerted diagnostics to avoid repeated alerts
let lastErrorCount = 0;
let isPlaying = false;

/**
 * Play sound using Windows Media Player COM object.
 * Waits for the full track to finish before returning.
 */
function playErrorSound() {
  if (isPlaying) return;
  isPlaying = true;

  const soundFile = path.join(__dirname, "/error.wav").replace(/\\/g, "\\\\");

  const psScript = `
  Add-Type -AssemblyName System.Media
  $player = New-Object System.Media.SoundPlayer
  $player.SoundLocation = "${soundFile}"
  $player.Load()
  $player.PlaySync()
  `;

  execFile("powershell.exe", ["-NoProfile", "-Command", psScript], (err) => {
    isPlaying = false;
    if (err) {
      console.error("Sound error:", err);
    }
  });
}

function activate(context) {
  console.log("Error Sound Alert is now active!");

  // 1. Detect errors in code editor (diagnostics / Problems panel)
  const diagDisposable = vscode.languages.onDidChangeDiagnostics((event) => {
    for (const uri of event.uris) {
      const diagnostics = vscode.languages.getDiagnostics(uri);
      const errorCount = diagnostics.filter(
        (d) => d.severity === vscode.DiagnosticSeverity.Error,
      ).length;

      if (errorCount > 0 && errorCount > lastErrorCount) {
        vscode.window.showErrorMessage(
          "⚠️ Error detected in: " + path.basename(uri.fsPath),
        );
        playErrorSound();
      }

      lastErrorCount = errorCount;
    }
  });

  // 2. Detect errors in terminal / PowerShell (when a command exits with non-zero code)
  const termDisposable = vscode.window.onDidEndTerminalShellExecution(
    (event) => {
      if (event.exitCode !== undefined && event.exitCode !== 0) {
        vscode.window.showErrorMessage(
          "⚠️ Terminal command failed with exit code: " + event.exitCode,
        );
        playErrorSound();
      }
    },
  );

  context.subscriptions.push(diagDisposable, termDisposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
