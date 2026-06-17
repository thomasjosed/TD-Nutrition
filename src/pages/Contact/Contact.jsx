/**
 * Contact Page — TD Nutrition
 * Formulario de contacto con validaciones y mapa/info de contacto
 */

import { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import styles from './Contact.module.css';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const CONTACT_INFO = [
  { icon: '📍', label: 'Dirección', value: 'Belgrano 146, Concepción, Tucumán, Argentina' },
  { icon: '📧', label: 'Email', value: 'hola@tdnutrition.com' },
  { icon: '📞', label: 'Teléfono', value: '+54 9 3813 28-5416' },
  { icon: '⏰', label: 'Horarios', value: 'Lun–Vie: 9:00 – 18:00 hs' },
];

const SUBJECTS = [
  'Consulta sobre producto',
  'Seguimiento de pedido',
  'Devoluciones y cambios',
  'Consulta nutricional',
  'Trabaja con nosotros',
  'Otro',
];

/* ── Validation helpers ── */
function validate(form) {
  const errors = {};
  if (!form.name.trim())
    errors.name = 'El nombre es obligatorio.';
  else if (form.name.trim().length < 3)
    errors.name = 'El nombre debe tener al menos 3 caracteres.';

  if (!form.email.trim())
    errors.email = 'El email es obligatorio.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Ingresá un email válido.';

  if (!form.subject)
    errors.subject = 'Seleccioná un asunto.';

  if (!form.message.trim())
    errors.message = 'El mensaje es obligatorio.';
  else if (form.message.trim().length < 20)
    errors.message = 'El mensaje debe tener al menos 20 caracteres.';

  return errors;
}

export default function Contact() {
  const { addToast } = useToast();
  const [form, setForm]         = useState(INITIAL_FORM);
  const [errors, setErrors]     = useState({});
  const [touched, setTouched]   = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    // Validación en tiempo real si el campo ya fue tocado
    if (touched[name]) {
      const newErrors = validate({ ...form, [name]: value });
      setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const newErrors = validate(form);
    setErrors(prev => ({ ...prev, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Marcar todos como tocados
    setTouched({ name: true, email: true, subject: true, message: true });
    const formErrors = validate(form);
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      addToast('⚠️ Por favor corregí los errores del formulario.', 'error');
      return;
    }

    setSubmitting(true);

    // Simular envío
    await new Promise(r => setTimeout(r, 1500));

    setSubmitting(false);
    setSubmitted(true);
    addToast('✅ ¡Mensaje enviado! Te responderemos en 24 hs.', 'success');
  };

  const handleReset = () => {
    setForm(INITIAL_FORM);
    setErrors({});
    setTouched({});
    setSubmitted(false);
  };

  return (
    <main className={styles.page}>
      {/* ── Page Header ── */}
      <div className={styles.pageHeader}>
        <div className="container">
          <span className="badge badge-orange">Hablemos</span>
          <h1 className={styles.pageTitle}>
            Contactá a <span className="text-orange">TD Nutrition</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Estamos acá para ayudarte. Ya sea una consulta sobre productos,
            un pedido o una asesoría nutricional, respondemos en menos de 24 hs.
          </p>
        </div>
      </div>

      <section className={styles.content}>
        <div className="container">
          <div className={styles.layout}>

            {/* ── Contact Form ── */}
            <div className={styles.formWrapper}>
              {submitted ? (
                /* ── Success state ── */
                <div className={styles.successState}>
                  <div className={styles.successIcon}>🎉</div>
                  <h2>¡Mensaje Recibido!</h2>
                  <p>
                    Gracias por contactarte con nosotros, <strong>{form.name}</strong>.
                    Te responderemos a <strong>{form.email}</strong> en menos de 24 horas hábiles.
                  </p>
                  <button className="btn btn-primary" onClick={handleReset}>
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                /* ── Form ── */
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>Envíanos un mensaje</h2>
                    <p className={styles.formSubtitle}>
                      Completá el formulario y te responderemos lo antes posible.
                    </p>
                  </div>

                  <div className={styles.formRow}>
                    {/* Name */}
                    <div className={styles.field}>
                      <label htmlFor="contact-name" className={styles.label}>
                        Nombre completo <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        className={`${styles.input} ${errors.name ? styles.inputError : ''} ${touched.name && !errors.name ? styles.inputValid : ''}`}
                        placeholder="Tu nombre completo"
                        value={form.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="name"
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <span id="name-error" className={styles.errorMsg} role="alert">
                          ⚠️ {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email */}
                    <div className={styles.field}>
                      <label htmlFor="contact-email" className={styles.label}>
                        Correo electrónico <span className={styles.required}>*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        className={`${styles.input} ${errors.email ? styles.inputError : ''} ${touched.email && !errors.email ? styles.inputValid : ''}`}
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        autoComplete="email"
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <span id="email-error" className={styles.errorMsg} role="alert">
                          ⚠️ {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div className={styles.field}>
                    <label htmlFor="contact-subject" className={styles.label}>
                      Asunto <span className={styles.required}>*</span>
                    </label>
                    <select
                      id="contact-subject"
                      name="subject"
                      className={`${styles.input} ${styles.select} ${errors.subject ? styles.inputError : ''} ${touched.subject && !errors.subject ? styles.inputValid : ''}`}
                      value={form.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!errors.subject}
                    >
                      <option value="">Seleccioná un asunto</option>
                      {SUBJECTS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.subject && (
                      <span className={styles.errorMsg} role="alert">
                        ⚠️ {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message */}
                  <div className={styles.field}>
                    <label htmlFor="contact-message" className={styles.label}>
                      Mensaje <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''} ${touched.message && !errors.message ? styles.inputValid : ''}`}
                      placeholder="Contanos en qué podemos ayudarte..."
                      value={form.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      aria-invalid={!!errors.message}
                    />
                    <div className={styles.charCount}>
                      {form.message.length} / 500 caracteres
                    </div>
                    {errors.message && (
                      <span className={styles.errorMsg} role="alert">
                        ⚠️ {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className={`btn btn-primary ${styles.submitBtn}`}
                    id="contact-submit"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <span className={styles.spinner} />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13"/>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                        </svg>
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* ── Contact Info ── */}
            <aside className={styles.infoPanel}>
              <h2 className={styles.infoTitle}>Información de contacto</h2>

              <div className={styles.infoCards}>
                {CONTACT_INFO.map(({ icon, label, value }) => (
                  <div key={label} className={styles.infoCard}>
                    <div className={styles.infoIcon}>{icon}</div>
                    <div>
                      <p className={styles.infoLabel}>{label}</p>
                      <p className={styles.infoValue}>{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social */}
              <div className={styles.socialSection}>
                <p className={styles.infoLabel} style={{ marginBottom: 'var(--space-md)' }}>
                  Seguinos en redes
                </p>
                <div className={styles.socialLinks}>
                  {['Instagram', 'Facebook', 'Twitter', 'YouTube'].map(net => (
                    <a key={net} href="#" className={styles.socialChip} aria-label={net}>
                      {net === 'Instagram' && 'IG'}
                      {net === 'Facebook'  && 'FB'}
                      {net === 'Twitter'   && 'TW'}
                      {net === 'YouTube'   && 'YT'}
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick response badge */}
              <div className={styles.responseBadge}>
                <span className={styles.responseDot} />
                <div>
                  <p className={styles.responseTitle}>Respuesta rápida</p>
                  <p className={styles.responseDesc}>Tiempo promedio: &lt;4 horas</p>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>
    </main>
  );
}
