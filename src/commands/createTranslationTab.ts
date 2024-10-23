import * as vscode from 'vscode';

export async function createTranslationTab(language: string, targetTitle: string): Promise<vscode.TextEditor> {
  const translationContent = `/* Start translating '${targetTitle}' to ${language} here */`;
  return await vscode.window.showTextDocument(
    await vscode.workspace.openTextDocument({
      content: translationContent,
      language: 'wikitext',
    }),
    { viewColumn: vscode.ViewColumn.Beside }
  );
}
