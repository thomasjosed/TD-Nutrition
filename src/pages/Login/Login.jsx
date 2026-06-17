/**
 * Login Page — TD Nutrition
 * Pantalla de inicio de sesión / registro con diseño premium split-screen
 */

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import styles from './Login.module.css';

/* ── Tab: login | register ── */
export default function Login() {
  const [tab, setTab] = useState('login'); // 'login' | 'register'

  return (
    <div className={styles.page}>
      {/* ── Left panel: branding ── */}
      <div className={styles.brandPanel}>
        <div className={styles.brandBlob1} />
        <div className={styles.brandBlob2} />
        <div className={styles.brandContent}>
          <Link to="/" className={styles.brandLogo}>
            <span className={styles.logoBox}>TD</span>
            <span className={styles.logoText}>Nutrition</span>
          </Link>
          <h1 className={styles.brandTagline}>
            Entrenás duro.<br />
            <span>Suplementate mejor.</span>
          </h1>
          <p className={styles.brandDesc}>
            Accedé a tu cuenta para guardar favoritos, ver el historial de pedidos
            y disfrutar de ofertas exclusivas para miembros.
          </p>
          <div className={styles.brandStats}>
            {[
              { v: '50K+',  l: 'Miembros' },
              { v: '40+',   l: 'Productos' },
              { v: '98%',   l: 'Satisfacción' },
            ].map(({ v, l }) => (
              <div key={l} className={styles.brandStat}>
                <span className={styles.brandStatVal}>{v}</span>
                <span className={styles.brandStatLabel}>{l}</span>
              </div>
            ))}
          </div>

          {/* Demo credentials hint */}
          <div className={styles.demoHint}>
            <span className={styles.demoIcon}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </span>
            <div>
              <p className={styles.demoTitle}>Credenciales demo</p>
              <p className={styles.demoCred}>thomas@tdnutrition.com · td2025</p>
              <p className={styles.demoCred}>demo@tdnutrition.com · demo123</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className={styles.formPanel}>
        <div className={styles.formCard}>
          {/* Tab switcher */}
          <div className={styles.tabs}>
            <button
              className={`${styles.tab} ${tab === 'login' ? styles.tabActive : ''}`}
              onClick={() => setTab('login')}
              id="tab-login"
            >
              Iniciar Sesión
            </button>
            <button
              className={`${styles.tab} ${tab === 'register' ? styles.tabActive : ''}`}
              onClick={() => setTab('register')}
              id="tab-register"
            >
              Registrarse
            </button>
          </div>

          {/* Form content */}
          {tab === 'login' ? <LoginForm /> : <RegisterForm onSuccess={() => setTab('login')} />}
        </div>
      </div>
    </div>
  );
}

/* ══════════ LOGIN FORM ══════════ */
function LoginForm() {
  const { login }    = useAuth();
  const { addToast } = useToast();
  const navigate     = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'El email es obligatorio.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Email inválido.';
    if (!password) e.password = 'La contraseña es obligatoria.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.ok) {
      addToast('¡Bienvenido de vuelta! 💪', 'success');
      navigate('/');
    } else {
      setErrors({ form: result.error });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Bienvenido de vuelta</h2>
        <p className={styles.formSubtitle}>Ingresá tus datos para continuar</p>
      </div>

      {/* Global error */}
      {errors.form && (
        <div className={styles.alertError} role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          {errors.form}
        </div>
      )}

      {/* Email */}
      <div className={styles.field}>
        <label htmlFor="login-email" className={styles.label}>Correo electrónico</label>
        <div className={styles.inputWrap}>
          <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <input
            id="login-email"
            type="email"
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="tu@email.com"
            value={email}
            onChange={e => { setEmail(e.target.value); setErrors(p => ({ ...p, email: '' })); }}
            autoComplete="email"
            aria-invalid={!!errors.email}
          />
        </div>
        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
      </div>

      {/* Password */}
      <div className={styles.field}>
        <label htmlFor="login-password" className={styles.label}>Contraseña</label>
        <div className={styles.inputWrap}>
          <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <input
            id="login-password"
            type={showPwd ? 'text' : 'password'}
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            placeholder="Tu contraseña"
            value={password}
            onChange={e => { setPassword(e.target.value); setErrors(p => ({ ...p, password: '' })); }}
            autoComplete="current-password"
          />
          <button
            type="button"
            className={styles.eyeBtn}
            onClick={() => setShowPwd(v => !v)}
            aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPwd ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
      </div>

      <button
        type="submit"
        className={styles.submitBtn}
        id="login-submit"
        disabled={loading}
      >
        {loading ? <span className={styles.spinner} /> : null}
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </button>

      <p className={styles.backLink}>
        <Link to="/">← Volver a la tienda sin iniciar sesión</Link>
      </p>
    </form>
  );
}

/* ══════════ REGISTER FORM ══════════ */
function RegisterForm({ onSuccess }) {
  const { register } = useAuth();
  const { addToast } = useToast();

  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' });
  const [errors, setErrors]   = useState({});
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const set = (field) => (e) => {
    setForm(p => ({ ...p, [field]: e.target.value }));
    setErrors(p => ({ ...p, [field]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim() || form.name.trim().length < 3)
      e.name = 'El nombre debe tener al menos 3 caracteres.';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Ingresá un email válido.';
    if (!form.password || form.password.length < 6)
      e.password = 'La contraseña debe tener al menos 6 caracteres.';
    if (form.password !== form.confirm)
      e.confirm = 'Las contraseñas no coinciden.';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    const result = await register(form.name, form.email, form.password);
    setLoading(false);

    if (result.ok) {
      addToast('¡Cuenta creada exitosamente! Iniciá sesión para continuar.', 'success');
      onSuccess();
    } else {
      setErrors({ form: result.error });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.formHeader}>
        <h2 className={styles.formTitle}>Crear cuenta</h2>
        <p className={styles.formSubtitle}>Unite a la comunidad TD Nutrition</p>
      </div>

      {errors.form && (
        <div className={styles.alertError} role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
          </svg>
          {errors.form}
        </div>
      )}

      {/* Name */}
      <div className={styles.field}>
        <label htmlFor="reg-name" className={styles.label}>Nombre completo</label>
        <div className={styles.inputWrap}>
          <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
          </svg>
          <input id="reg-name" type="text" className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
            placeholder="Tu nombre completo" value={form.name} onChange={set('name')} autoComplete="name" />
        </div>
        {errors.name && <span className={styles.fieldError}>{errors.name}</span>}
      </div>

      {/* Email */}
      <div className={styles.field}>
        <label htmlFor="reg-email" className={styles.label}>Correo electrónico</label>
        <div className={styles.inputWrap}>
          <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          <input id="reg-email" type="email" className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
            placeholder="tu@email.com" value={form.email} onChange={set('email')} autoComplete="email" />
        </div>
        {errors.email && <span className={styles.fieldError}>{errors.email}</span>}
      </div>

      {/* Password */}
      <div className={styles.field}>
        <label htmlFor="reg-password" className={styles.label}>Contraseña</label>
        <div className={styles.inputWrap}>
          <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <input id="reg-password" type={showPwd ? 'text' : 'password'}
            className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
            placeholder="Mínimo 6 caracteres" value={form.password} onChange={set('password')} />
          <button type="button" className={styles.eyeBtn} onClick={() => setShowPwd(v => !v)}>
            {showPwd ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="1" y1="1" x2="23" y2="23"/>
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {errors.password && <span className={styles.fieldError}>{errors.password}</span>}
      </div>

      {/* Confirm password */}
      <div className={styles.field}>
        <label htmlFor="reg-confirm" className={styles.label}>Confirmar contraseña</label>
        <div className={styles.inputWrap}>
          <svg className={styles.inputIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <input id="reg-confirm" type="password"
            className={`${styles.input} ${errors.confirm ? styles.inputError : ''}`}
            placeholder="Repetí tu contraseña" value={form.confirm} onChange={set('confirm')} />
        </div>
        {errors.confirm && <span className={styles.fieldError}>{errors.confirm}</span>}
      </div>

      <button type="submit" className={styles.submitBtn} id="register-submit" disabled={loading}>
        {loading ? <span className={styles.spinner} /> : null}
        {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
      </button>

      <p className={styles.backLink}>
        <Link to="/">← Continuar sin cuenta</Link>
      </p>
    </form>
  );
}
