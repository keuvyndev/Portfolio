import tkinter as tk
from tkinter import ttk
import speech_recognition as sr
from googletrans import Translator, LANGUAGES

class TranslatorApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Tradutor de Voz")

        # Configuração da interface
        self.create_widgets()

        # Inicializar o reconhecedor de fala e o tradutor
        self.recognizer = sr.Recognizer()
        self.translator = Translator()

    def create_widgets(self):
        # Label e dropdown para idioma de origem
        self.src_lang_label = tk.Label(self.root, text="Idioma de Origem:")
        self.src_lang_label.grid(row=0, column=0, padx=10, pady=10)

        self.src_lang = tk.StringVar(value='pt')
        self.src_lang_dropdown = ttk.Combobox(self.root, textvariable=self.src_lang, values=list(LANGUAGES.values()))
        self.src_lang_dropdown.grid(row=0, column=1, padx=10, pady=10)

        # Label e dropdown para idiomas de saída
        self.dest_lang1_label = tk.Label(self.root, text="Idioma de Destino 1:")
        self.dest_lang1_label.grid(row=1, column=0, padx=10, pady=10)

        self.dest_lang1 = tk.StringVar(value='en')
        self.dest_lang1_dropdown = ttk.Combobox(self.root, textvariable=self.dest_lang1, values=list(LANGUAGES.values())))
        self.dest_lang1_dropdown.grid(row=1, column=1, padx=10, pady=10)

        self.dest_lang2_label = tk.Label(self.root, text="Idioma de Destino 2:")
        self.dest_lang2_label.grid(row=2, column=0, padx=10, pady=10)

        self.dest_lang2 = tk.StringVar(value='fr')
        self.dest_lang2_dropdown = ttk.Combobox(self.root, textvariable=self.dest_lang2, values=list(LANGUAGES.values())))
        self.dest_lang2_dropdown.grid(row=2, column=1, padx=10, pady=10)

        # Botão para iniciar o reconhecimento de fala
        self.start_button = tk.Button(self.root, text="Iniciar Reconhecimento", command=self.start_recognition)
        self.start_button.grid(row=3, column=0, columnspan=2, padx=10, pady=10)

        # Labels para exibir os textos traduzidos
        self.result_label1 = tk.Label(self.root, text="Tradução 1:")
        self.result_label1.grid(row=4, column=0, padx=10, pady=10)

        self.result_text1 = tk.Label(self.root, text="", wraplength=400)
        self.result_text1.grid(row=4, column=1, padx=10, pady=10)

        self.result_label2 = tk.Label(self.root, text="Tradução 2:")
        self.result_label2.grid(row=5, column=0, padx=10, pady=10)

        self.result_text2 = tk.Label(self.root, text="", wraplength=400)
        self.result_text2.grid(row=5, column=1, padx=10, pady=10)

    def start_recognition(self):
        src_language_code = [key for key, value in LANGUAGES.items() if value == self.src_lang.get()][0]
        dest_language_code1 = [key for key, value in LANGUAGES.items() if value == self.dest_lang1.get()][0]
        dest_language_code2 = [key for key, value in LANGUAGES.items() if value == self.dest_lang2.get()][0]

        with sr.Microphone() as source:
            self.recognizer.adjust_for_ambient_noise(source)
            print("Fale algo...")
            audio = self.recognizer.listen(source)

            try:
                text = self.recognizer.recognize_google(audio, language=src_language_code)
                print("Você disse:", text)

                # Tradução
                translated1 = self.translator.translate(text, src=src_language_code, dest=dest_language_code1)
                translated2 = self.translator.translate(text, src=src_language_code, dest=dest_language_code2)

                self.result_text1.config(text=translated1.text)
                self.result_text2.config(text=translated2.text)

            except sr.UnknownValueError:
                print("Não consegui entender o áudio")
            except sr.RequestError as e:
                print(f"Erro ao solicitar resultados; {e}")

if __name__ == "__main__":
    root = tk.Tk()
    app = TranslatorApp(root)
    root.mainloop()