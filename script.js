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

  /* ── Config ── */
  const WEBHOOK_URL  = 'https://agentes-n8n.rcsmc9.easypanel.host/webhook/chat_bot_odontix';
  const LEAD_WEBHOOK = 'https://agentes-n8n.rcsmc9.easypanel.host/webhook/lead_odontix';
  const WA_NUMBER    = '34682841354';
  const CALENDLY_URL = 'https://calendly.com/wernher-martinez/30min';

  /* ── Planes ── */
  const PLANES = [
    {
      id: 'basic',
      nombre: 'Basic',
      precio: '89€/mes',
      desc: 'El primer paso hacia la automatización.',
      items: ['Bot WhatsApp 24/7', 'Agenda automática de citas', 'Recordatorios y confirmaciones'],
      color: '#3b82f6'
    },
    {
      id: 'professional',
      nombre: 'Professional',
      precio: '149€/mes',
      desc: 'Dashboard completo + bot avanzado.',
      items: ['Todo lo del Basic', 'Dashboard con agenda visual', 'Historial de pacientes y estadísticas', 'Seguimiento de ausencias'],
      color: '#8b5cf6',
      popular: true
    },
    {
      id: 'premium',
      nombre: 'Premium',
      precio: '229€/mes',
      desc: 'IA avanzada para clínicas que quieren escalar.',
      items: ['Todo lo del Professional', 'Campañas IA para pacientes inactivos', 'Insights IA en el dashboard', 'Reporte mensual automático'],
      color: '#f59e0b'
    }
  ];

  /* ── Estado ── */
  const history   = [];
  const sessionId = 'session_' + Math.random().toString(36).slice(2);
  let isOpen      = false;
  let isWaiting   = false;
  let chatMode    = 'guided'; // 'guided' | 'free'
  let leadStep    = null;     // null | 'nombre' | 'clinica' | 'contacto' | 'done'
  const leadData  = { nombre: '', clinica: '', contacto: '', planInteres: '' };

  /* ── DOM ── */
  const chatbot  = document.getElementById('chatbot');
  const toggle   = document.getElementById('chatToggle');
  const panel    = document.getElementById('chatPanel');
  const closeBtn = document.getElementById('chatClose');
  const msgs     = document.getElementById('chatMessages');
  const form     = document.getElementById('chatForm');
  const input    = document.getElementById('chatInput');
  const sendBtn  = form.querySelector('.chat-send');

  /* ── Helpers de render ── */
  function scrollBottom() { msgs.scrollTop = msgs.scrollHeight; }

  function addBotMessage(text, showWA = false) {
    const wrap   = document.createElement('div');
    wrap.className = 'chat-msg bot';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.innerHTML = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    wrap.appendChild(bubble);
    if (showWA) wrap.appendChild(buildWABtn());
    msgs.appendChild(wrap);
    scrollBottom();
  }

  function addUserMessage(text) {
    const wrap   = document.createElement('div');
    wrap.className = 'chat-msg user';
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    bubble.textContent = text;
    wrap.appendChild(bubble);
    msgs.appendChild(wrap);
    scrollBottom();
  }

  function showTyping() {
    const wrap = document.createElement('div');
    wrap.className = 'chat-msg bot chat-typing';
    wrap.id = 'chatTyping';
    wrap.innerHTML = `<div class="chat-bubble"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>`;
    msgs.appendChild(wrap);
    scrollBottom();
  }

  function hideTyping() {
    const t = document.getElementById('chatTyping');
    if (t) t.remove();
  }

  function buildWABtn(text = 'Continuar por WhatsApp', waText = 'Hola%2C+me+interesa+ODONTIX') {
    const a = document.createElement('a');
    a.href = `https://wa.me/${WA_NUMBER}?text=${waText}`;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.className = 'chat-wa-btn';
    a.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.554 4.122 1.524 5.853L0 24l6.335-1.524A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.371l-.36-.213-3.724.895.91-3.633-.234-.373A9.818 9.818 0 1 1 12 21.818z"/></svg>${text}`;
    return a;
  }

  /* ── Quick reply chips ── */
  function addChips(opciones) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-chips';
    wrap.id = 'chatChips';
    opciones.forEach(({ label, action }) => {
      const btn = document.createElement('button');
      btn.className = 'chat-chip';
      btn.textContent = label;
      btn.addEventListener('click', () => {
        wrap.remove();
        addUserMessage(label);
        action();
      });
      wrap.appendChild(btn);
    });
    msgs.appendChild(wrap);
    scrollBottom();
  }

  function removeChips() {
    const c = document.getElementById('chatChips');
    if (c) c.remove();
  }

  /* ── Cards de planes ── */
  function addPlanCards(planInteres = '') {
    const wrap = document.createElement('div');
    wrap.className = 'chat-plans';
    PLANES.forEach(p => {
      const card = document.createElement('div');
      card.className = 'chat-plan-card' + (p.popular ? ' popular' : '');
      card.innerHTML = `
        ${p.popular ? '<div class="chat-plan-badge">Más elegido</div>' : ''}
        <div class="chat-plan-header">
          <span class="chat-plan-name">${p.nombre}</span>
          <span class="chat-plan-price">${p.precio}</span>
        </div>
        <p class="chat-plan-desc">${p.desc}</p>
        <ul class="chat-plan-items">
          ${p.items.map(i => `<li>✓ ${i}</li>`).join('')}
        </ul>
        <button class="chat-plan-cta" data-plan="${p.id}">Quiero este plan</button>
      `;
      card.querySelector('.chat-plan-cta').addEventListener('click', () => {
        wrap.remove();
        leadData.planInteres = p.id;
        addUserMessage(`Me interesa el plan ${p.nombre}`);
        startLeadCapture(p.nombre);
      });
      wrap.appendChild(card);
    });
    msgs.appendChild(wrap);
    scrollBottom();
  }

  /* ── Captura de lead ── */
  function startLeadCapture(planNombre = '') {
    const intro = planNombre
      ? `¡Excelente elección! Antes de mostrarte la demo de **${planNombre}**, necesito un par de datos para personalizarla.`
      : `¡Perfecto! Antes de la demo, necesito un par de datos.`;
    setTimeout(() => {
      addBotMessage(intro);
      setTimeout(() => {
        addBotMessage('¿Cuál es tu nombre?');
        leadStep = 'nombre';
        input.placeholder = 'Tu nombre...';
        input.focus();
      }, 600);
    }, 300);
  }

  function handleLeadStep(text) {
    if (leadStep === 'nombre') {
      leadData.nombre = text;
      leadStep = 'clinica';
      setTimeout(() => {
        addBotMessage(`Un placer, **${text}**. ¿Cómo se llama tu clínica?`);
        input.placeholder = 'Nombre de tu clínica...';
      }, 400);
      return true;
    }
    if (leadStep === 'clinica') {
      leadData.clinica = text;
      leadStep = 'contacto';
      setTimeout(() => {
        addBotMessage('¿Tu número de WhatsApp o email? Te contactamos en menos de 24h.');
        input.placeholder = 'WhatsApp o email...';
      }, 400);
      return true;
    }
    if (leadStep === 'contacto') {
      leadData.contacto = text;
      leadStep = 'done';
      input.placeholder = 'Escribe tu pregunta…';
      finalizeLead();
      return true;
    }
    return false;
  }

  async function finalizeLead() {
    // Enviar lead a n8n
    try {
      await fetch(LEAD_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: leadData.nombre,
          clinica: leadData.clinica,
          contacto: leadData.contacto,
          plan_interes: leadData.planInteres || 'no especificado',
          origen: 'chatbot_web',
          fecha: new Date().toISOString()
        })
      });
    } catch (e) { /* silencioso */ }

    setTimeout(() => {
      addBotMessage(`¡Gracias, **${leadData.nombre}**! 🎉\n\nHemos anotado tus datos. Uno de nuestros especialistas contactará con **${leadData.clinica}** en menos de 24 horas.\n\nSi prefieres hablar ahora, tienes estas opciones:`);
      const wrap = document.createElement('div');
      wrap.className = 'chat-msg bot';
      // Calendly button
      const calBtn = document.createElement('a');
      calBtn.href = CALENDLY_URL;
      calBtn.target = '_blank';
      calBtn.rel = 'noopener noreferrer';
      calBtn.className = 'chat-calendly-btn';
      calBtn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> Agendar demo ahora`;
      wrap.appendChild(calBtn);
      wrap.appendChild(buildWABtn('O hablar por WhatsApp', `Hola%2C+soy+${encodeURIComponent(leadData.nombre)}+de+${encodeURIComponent(leadData.clinica)}+y+me+interesa+ODONTIX`));
      msgs.appendChild(wrap);
      scrollBottom();

      // Ofrecer preguntas adicionales
      setTimeout(() => {
        addBotMessage('¿Tienes alguna pregunta más mientras tanto?');
        chatMode = 'free';
        input.placeholder = 'Escribe tu pregunta…';
      }, 1000);
    }, 500);
  }

  /* ── Flujo inicial ── */
  function showWelcome() {
    addBotMessage('👋 ¡Hola! Soy el asistente de **ODONTIX**.\n\n¿En qué puedo ayudarte hoy?');
    setTimeout(() => {
      addChips([
        { label: '💰 Ver los planes', action: showPlanes },
        { label: '💬 Tengo una pregunta', action: startFreeChat },
        { label: '📅 Quiero una demo', action: () => startLeadCapture() }
      ]);
    }, 400);
  }

  function showPlanes() {
    chatMode = 'guided';
    addBotMessage('Estos son nuestros planes. Todos incluyen configuración y soporte:');
    setTimeout(() => addPlanCards(), 400);
  }

  function startFreeChat() {
    chatMode = 'free';
    addBotMessage('Claro, ¿qué quieres saber? Puedo explicarte cómo funciona el bot, los canales que soportamos, la implementación...');
    input.placeholder = 'Escribe tu pregunta…';
    input.focus();
  }

  /* ── Abrir / cerrar ── */
  function openChat() {
    isOpen = true;
    chatbot.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    input.focus();
    if (msgs.children.length === 0) showWelcome();
  }

  function closeChat() {
    isOpen = false;
    chatbot.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', () => isOpen ? closeChat() : openChat());
  closeBtn.addEventListener('click', closeChat);

  /* ── Enviar mensaje ── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text || isWaiting) return;
    input.value = '';

    removeChips();
    addUserMessage(text);

    // Flujo de captura de lead
    if (leadStep && leadStep !== 'done') {
      handleLeadStep(text);
      return;
    }

    // Modo libre → n8n
    if (chatMode === 'free') {
      isWaiting = true;
      sendBtn.disabled = true;
      history.push({ role: 'user', content: text });
      showTyping();

      try {
        const res = await fetch(WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: text, sessionId, history })
        });
        if (!res.ok) throw new Error('Error del servidor');
        const rawText = await res.text();
        let reply = '¿Puedes repetir la pregunta?';
        if (rawText && rawText.trim().length > 1) {
          reply = rawText.trim().replace(/^=+/, '');
        }
        hideTyping();
        history.push({ role: 'assistant', content: reply });
        addBotMessage(reply);

        // Si lleva 2+ mensajes libres, ofrecer demo
        if (history.filter(m => m.role === 'user').length === 2 && leadStep === null) {
          setTimeout(() => {
            addBotMessage('¿Te gustaría que un especialista te mostrase todo en detalle?');
            setTimeout(() => {
              addChips([
                { label: '📅 Sí, quiero una demo', action: () => startLeadCapture() },
                { label: '💬 Sigo con preguntas', action: () => {} }
              ]);
            }, 300);
          }, 800);
        }
      } catch (err) {
        hideTyping();
        addBotMessage('⚠️ Problema de conexión. Escríbenos directamente.', true);
      } finally {
        isWaiting = false;
        sendBtn.disabled = false;
        input.focus();
      }
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      form.requestSubmit();
    }
  });

})();
