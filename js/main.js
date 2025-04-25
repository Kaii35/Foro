// Funcionalidad para crear nuevos posts
document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.querySelector('.new-post-form');
    const postInput = document.querySelector('.post-input');
    const feed = document.querySelector('.feed');

    if (newPostForm) {
        newPostForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const content = postInput.value.trim();
            
            if (content) {
                createNewPost(content);
                postInput.value = '';
            }
        });
    }

    function createNewPost(content) {
        const post = document.createElement('article');
        post.className = 'post';
        
        const currentTime = new Date().toLocaleTimeString();
        
        post.innerHTML = `
            <div class="post-header">
                <img src="assets/default-avatar.png" alt="Avatar" class="post-avatar">
                <div class="post-info">
                    <h3>Usuario</h3>
                    <span class="post-time">${currentTime}</span>
                </div>
            </div>
            <div class="post-content">
                <p>${content}</p>
            </div>
            <div class="post-actions">
                <button class="action-btn like">❤️ 0</button>
                <button class="action-btn comment">💬 0</button>
                <button class="action-btn share">🔄 Compartir</button>
            </div>
        `;

        feed.insertBefore(post, feed.firstChild);
    }

    // Funcionalidad para los botones de acción
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('action-btn')) {
            const actionBtn = e.target;
            const count = parseInt(actionBtn.textContent.match(/\d+/)[0]);
            
            if (actionBtn.classList.contains('like')) {
                actionBtn.textContent = `❤️ ${count + 1}`;
            } else if (actionBtn.classList.contains('comment')) {
                actionBtn.textContent = `💬 ${count + 1}`;
            }
        }
    });
}); 