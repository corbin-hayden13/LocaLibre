from typing import TypeAlias
import tkinter as tk
from tkinter import filedialog


if __name__ == "__main__":
    root = tk.Tk()
    root.withdraw()
    folder_path: str = filedialog.askdirectory()
    root.destroy()

    if folder_path:
        # Passing folder_path to stdout
        print(folder_path)