import * as vscode from 'vscode';
import fetch from 'node-fetch';

export async function fetchWikiContent(language: string) {
  const articleTitle = await vscode.window.showInputBox({
    placeHolder: 'Enter the title of the Wikipedia article in English',
  });

  if (!articleTitle) {
    vscode.window.showErrorMessage('Article title is required');
    return;
  }

  const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
    articleTitle
  )}&prop=revisions&rvprop=content&format=json`;

  try {
    const response = await fetch(url);
    const data: any = await response.json();
    const pages = data.query.pages;
    const pageId = Object.keys(pages)[0];

    if (pageId === '-1') {
      vscode.window.showErrorMessage('Article not found');
    } else {
      const content = pages[pageId].revisions[0]['*'];
      const editor = await vscode.window.showTextDocument(
        await vscode.workspace.openTextDocument({
          content,
          language: 'wikitext',
        })
      );
    }
  } catch (error) {
    vscode.window.showErrorMessage('Error fetching Wikipedia content');
  }
}
