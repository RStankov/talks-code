import "phoenix_html"
import socket from "./socket"

const form = document.getElementById('comment-form');
if (form) {
  const channel = socket.channel(`blog:comments:${ form.dataset.id }`, {});
  channel.on('new-comment', payload => {
    const author = document.createElement('strong');
    author.innerText = payload.author;

    const content = document.createElement('span');
    content.innerText = `: ${ payload.content }`;

    const item = document.createElement('p');
    item.appendChild(author);
    item.appendChild(content);

    const list = document.getElementById('comments-list');
    list.appendChild(item);
  });
  channel.join();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const author = document.getElementById('comment-author');
    const content = document.getElementById('comment-content');

    const authorValue = author.value;
    const contentValue = content.value;

    if (!authorValue || !contentValue) {
      return;
    }

    channel.push('new-comment', {
      author: authorValue,
      content: contentValue
    });

    content.value = '';
  });
}
