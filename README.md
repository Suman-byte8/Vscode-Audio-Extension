# Error Sound Alert 🔊

**Error Sound Alert** is a Visual Studio Code extension that plays a sound whenever a terminal command fails or a runtime error occurs.

Instead of silently missing errors in the terminal, this extension immediately alerts you with a sound so you can notice the failure quickly.

Currently the extension plays the viral Arpit Bala audio:

> "Ye Bk*, ye jaha bhi dikhta hain gussa boht ata hain bhai"

whenever a command exits with an error.

---

## ✨ Features

* 🔊 Plays an audio alert when a terminal command fails
* 🐍 Works great when running Python scripts that throw runtime errors
* 🖥️ Detects terminal exit codes automatically
* 🚫 Prevents multiple sound triggers for the same error

Example:

```python
print(1/0)
```

When this produces a runtime error, the extension immediately plays the alert sound.

---

## ⚙️ Requirements

No additional setup required.

Just install the extension and run code in the terminal normally.

---

## 📦 Installation

Once published, install directly from the Visual Studio Code Marketplace or using:

```
code --install-extension error-sound-alert
```

---

## 🚀 Usage

1. Run a program in the VS Code terminal
2. If the command fails or exits with a non-zero status
3. The extension automatically plays the alert sound

---

## ⚠️ Known Issues

* Sound alerts currently trigger for any terminal command failure
* Some shells may delay detection slightly depending on shell integration

---

## 📝 Release Notes

### 1.0.0

Initial release of **Error Sound Alert**

* Detect terminal command failures
* Play alert sound automatically

---

## 💻 Source Code

GitHub Repository:

https://github.com/Suman-byte8/Vscode-Audio-Extension

---

## 🎉 Enjoy!

Happy coding — and never miss an error again.
