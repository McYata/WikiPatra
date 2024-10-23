import * as vscode from 'vscode';
import fetch from 'node-fetch';

export async function postTranslation(language: string, targetTitle: string, content: string) {
  const summary = await vscode.window.showInputBox({
    placeHolder: 'Enter a summary for your edit',
  });

  if (!summary) {
    vscode.window.showErrorMessage('Edit summary is required');
    return;
  }

  try {
    // API URL for posting content (you need to replace 'YOUR_OAUTH_TOKEN' with the actual token)
    const url = `https://${language}.wikipedia.org/w/api.php?action=edit&title=${encodeURIComponent(
      targetTitle
    )}&summary=${encodeURIComponent(summary)}&contentmodel=wikitext&format=json`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer YOUR_OAUTH_TOKEN',
      },
      body: `text=${encodeURIComponent(content)}`,
    });

    const data: any = await response.json();
    if (data && data.edit && data.edit.result === 'Success') {
      vscode.window.showInformationMessage('Article successfully posted to Wikipedia.');
    } else {
      vscode.window.showErrorMessage('Failed to post the article. Please check your credentials and try again.');
    }
  } catch (error: any) {
    vscode.window.showErrorMessage('Error posting to Wikipedia: ' + error.message);
  }
}
