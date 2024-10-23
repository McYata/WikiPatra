import * as vscode from 'vscode';
import fetch from 'node-fetch';

export async function fetchWikiContent(language: string, articleTitle: string) {
  const url = `https://${language}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
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
      await vscode.window.showTextDocument(
        await vscode.workspace.openTextDocument({
          content,
          language: 'wikitext',
        })
      );
    }
  } catch (error: any) {
    vscode.window.showErrorMessage('Error fetching Wikipedia content: ' + error.message);
  }
}
