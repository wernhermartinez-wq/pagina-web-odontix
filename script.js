/* ODONTIX — Main Script */

/* ══════════════ NAV ══════════════ */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ══════════════ FAQ ACCORDION ══════════════ */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item.open').forEach(open => {
      open.classList.remove('open');
      open.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ══════════════ SCROLL ANIMATIONS (AOS-lite) ══════════════ */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animated');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach(el => observer.observe(el));

/* ══════════════ SMOOTH ANCHOR SCROLL ══════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ══════════════ CHATBOT ══════════════ */
(function () {
  /* ── Configuración ── */
  const WEBHOOK_URL = 'https://agentes-n8n.rcsmc9.easypanel.host/webhook/chat_bot_odontix';
  const WA_NUMBER  = '34682841354';

  /* ── Estado ── */
  const history = [];
  const sessionId = 'session_' + Math.random().toString(36).slice(2);
  let isOpen    = false;
  let isWaiting = false;

  /* ── Referencias DOM ── */
  const chatbot   = document.getElementById('chatbot');
  const toggle    = document.getElementById('chatToggle');
  const panel     = document.getElementById('chatPanel');
  const closeBtn  = document.getElementById('chatClose');
  const messages  = document.getElementById('chatMessages');
  const form      = document.getElementById('chatForm');
  const input     = document.getElementById('chatInput');
  const sendBtn   = form.querySelector('.chat-send');

  /* ── Abrir / cerrar ── */
  function openChat() {
    isOpen = true;
    chatbot.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
    if (messages.children.length === 0) addBotMessage(
      '👋 ¡Hola! Soy el asistente de **ODONTIX**. ¿En qué puedo ayudarte hoy?\n\nPuedo contarte sobre nuestros agentes IA, precios, o ayudarte a agendar una demo.'
    );
  }

  function closeChat() {
    isOpen = false;
    chatbot.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  /* ── Renderizar mensaje ── */
  function addBotMessage(text, showWA = false) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg bot';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    // Markdown mínimo: **negrita**, saltos de línea
    bubble.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    wrap.appendChild(bubble);

    if (showWA) {
      const waBtn = document.createElement('a');
      waBtn.href      = `https://wa.me/${WA_NUMBER}?text=Hola%2C+me+interesa+ODONTIX`;
      waBtn.target    = '_blank';
      waBtn.rel       = 'noopener noreferrer';
      waBtn.className = 'chat-wa-btn';
      waBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.554 4.122 1.524 5.853L0 24l6.335-1.524A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.213-3.724.895.91-3.633-.234-.373A9.818 9.818 0 1 1 12 21.818z"/></svg>
        Continuar por WhatsApp`;
      wrap.appendChild(waBtn);
    }

    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function addUserMessage(text) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg user';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg bot chat-typing';
    wrap.id = 'chatTyping';
    wrap.innerHTML = `<div class="chat-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;
  }

  function hideTyping() {
    const t = document.getElementById('chatTyping');
    if (t) t.remove();
  }

  /* ── Enviar mensaje a n8n ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || isWaiting) return;

    input.value = '';
    isWaiting   = true;
    sendBtn.disabled = true;

    addUserMessage(text);
    history.push({ role: 'user', content: text });

    showTyping();

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, sessionId, history }),
      });

      if (!res.ok) throw new Error('Error del servidor');

      const rawText = await res.text();
      console.log('🤖 n8n raw:', rawText);

      let reply = '¿Puedes repetir la pregunta?';
      const showWA = false;

      if (rawText && rawText.trim().length > 1) {
        // Quitar el "=" inicial que n8n agrega en modo Text
        reply = rawText.trim().replace(/^=+/, '').replace(/\*\*/g, '');
      }

      hideTyping();
      history.push({ role: 'assistant', content: reply });
      addBotMessage(reply, showWA);

    } catch (err) {
      hideTyping();
      addBotMessage('⚠️ Hubo un problema de conexión. Inténtalo de nuevo o escríbenos por WhatsApp.', true);
    } finally {
      isWaiting        = false;
      sendBtn.disabled = false;
      input.focus();
    }
  });

  /* ── Enter envía ── */
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

})();
