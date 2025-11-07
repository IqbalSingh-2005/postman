// src/themes/monacoThemes.js

export function registerMonacoThemes(monaco) {
  monaco.editor.defineTheme('customDark', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#212121',
      'editor.foreground': '#FFFFFF',
      'editorLineNumber.foreground': '#888888',
      'editorCursor.foreground': '#504f4f',
      'editor.selectionBackground': '#44475A',
    },
  });

  monaco.editor.defineTheme('customLight', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'editor.background': '#F8F8F8',
      'editor.foreground': '#000000',
      'editorLineNumber.foreground': '#999999',
      'editorCursor.foreground': '#007ACC',
      'editor.selectionBackground': '#D6EBFF',
    },
  });
}
