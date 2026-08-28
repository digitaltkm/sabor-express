/**
 * Dirección Ruta Retro-Fuego: una comanda urbana asimétrica con rojo plancha,
 * tickets gráficos y fotografía gastronómica como protagonista.
 */
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  ArrowDown,
  ArrowUp,
  Check,
  Clock3,
  Flame,
  MapPin,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
  X,
  Zap,
} from "lucide-react";

const heroImage = "/assets/hero.svg";
const burgerImage = "/assets/burger.svg";
const friesImage = "/assets/fries.svg";
const markImage = "/assets/mark.svg";

type Category = "Todos" | "Burgers" | "Combos" | "Sides";

type MenuItem = {
  id: string;
  category: Exclude<Category, "Todos">;
  name: string;
  description: string;
  price: number;
  tag: string;
  tone: "red" | "yellow" | "charcoal" | "cream";
  image?: string;
  illustration: string;
};

const menuItems: MenuItem[] = [
  {
    id: "crunch", category: "Burgers", name: "Crunch Fuego", price: 10.9,
    description: "Pollo crujiente, slaw morado y salsa de la casa.", tag: "Más pedida",
    tone: "red", image: burgerImage, illustration: "✦",
  },
  {
    id: "smash", category: "Burgers", name: "Doble Plancha", price: 11.5,
    description: "Doble smash, cheddar, pepinillo y cebolla tostada.", tag: "100% plancha",
    tone: "charcoal", illustration: "≋",
  },
  {
    id: "combo", category: "Combos", name: "Combo Sin Frenos", price: 14.9,
    description: "Tu burger, patatas crujientes y bebida muy fría.", tag: "Ahorra 2,40 €",
    tone: "yellow", illustration: "↯",
  },
  {
    id: "fries", category: "Sides", name: "Patatas Cargadas", price: 5.9,
    description: "Cheddar, jalapeño, tomate y nuestro toque ahumado.", tag: "Nivel 2 de fuego",
    tone: "cream", image: friesImage, illustration: "⌁",
  },
];

const formatPrice = (value: number) =>
  new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value);

export default function Home() {
  // The useAuth hook provides authentication state.
  // To implement login/logout, call logout(), or start login from an event
  // handler: onClick={() => startLogin()} (imported from "@/const"). Never call
  // startLogin() during render (no href={startLogin()}) — it mints a one-time
  // nonce cookie and must run only at the moment of navigation.


  const [category, setCategory] = useState<Category>("Todos");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [heat, setHeat] = useState(2);
  const [notice, setNotice] = useState("Tu comanda espera una primera elección.");

  const filteredItems = useMemo(
    () => category === "Todos" ? menuItems : menuItems.filter((item) => item.category === category),
    [category]
  );

  const cartItems = useMemo(
    () => menuItems.filter((item) => cart[item.id]).map((item) => ({ ...item, quantity: cart[item.id] })),
    [cart]
  );

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(item: MenuItem) {
    setCart((current) => ({ ...current, [item.id]: (current[item.id] || 0) + 1 }));
    setNotice(`${item.name} se ha sumado a tu comanda.`);
  }

  function updateQuantity(id: string, change: number) {
    setCart((current) => {
      const nextValue = (current[id] || 0) + change;
      if (nextValue <= 0) {
        const { [id]: _, ...rest } = current;
        return rest;
      }
      return { ...current, [id]: nextValue };
    });
  }

  function pickCombo() {
    const combo = menuItems.find((item) => item.id === "combo");
    if (combo) addToCart(combo);
    setNotice(`Combo Sin Frenos preparado a fuego ${heat} de 3.`);
  }

  function scrollToMenu() {
    document.getElementById("carta")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#f7f0df] text-[#201b18]">
      <a className="skip-link" href="#contenido">Saltar al contenido</a>

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Sabor Express, inicio">
          <span className="brand-mark"><img src={markImage} alt="" /></span>
          <span className="brand-copy"><strong>Sabor</strong><em>Express</em></span>
        </a>

        <nav className="desktop-nav" aria-label="Navegación principal">
          <a href="#carta">La carta</a>
          <a href="#combina">Tu combo</a>
          <a href="#hora">Horario</a>
        </nav>

        <div className="header-actions">
          <button className="location-pill" onClick={() => setNotice("Recogida simulada: Calle del Antojo, 17.")}>
            <MapPin size={16} aria-hidden="true" />
            <span>Madrid Centro</span>
          </button>
          <button className="nav-cart" onClick={() => setCartOpen(true)} aria-label={`Abrir comanda, ${itemCount} productos`}>
            <ShoppingBag size={19} aria-hidden="true" />
            <span className="cart-counter">{itemCount}</span>
          </button>
          <button className="mobile-menu-button" onClick={() => setMobileMenuOpen((open) => !open)} aria-expanded={mobileMenuOpen} aria-label="Abrir menú">
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <nav className="mobile-nav" aria-label="Navegación móvil">
            <a onClick={() => setMobileMenuOpen(false)} href="#carta">La carta</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#combina">Tu combo</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#hora">Horario</a>
          </nav>
        )}
      </header>

      <main id="contenido">
        <section className="hero" id="inicio">
          <div className="hero-copy">
            <div className="eyebrow"><span className="live-dot" /> PLANCHA ABIERTA · 12:30—23:30</div>
            <h1>La burger<br /><span>sin frenos.</span></h1>
            <p>Smash, crunch y salsas que no se disculpan. Pide rápido. Muérdela lento.</p>
            <div className="hero-actions">
              <Button className="cta-main" onClick={scrollToMenu}>Arma tu comanda <ArrowDown size={18} /></Button>
              <button className="time-link" onClick={() => setNotice("Tiempo estimado de preparación: 12 minutos.")}><Clock3 size={18} /> Lista en 12 min</button>
            </div>
            <div className="hero-note"><Sparkles size={16} /> Ingredientes de verdad. Hambre de verdad.</div>
          </div>

          <div className="hero-visual" role="img" aria-label="Hamburguesa smash con patatas crujientes">
            <img src={heroImage} alt="Hamburguesa smash de Sabor Express con patatas" />
            <div className="hero-stamp"><Flame size={24} /><span>HECHA<br />AL MOMENTO</span></div>
            <div className="hero-price"><small>Desde</small><strong>8,90 €</strong></div>
            <div className="scribble scribble-one">¡CRUNCH!</div>
          </div>
        </section>

        <section className="marquee" aria-label="Nuestros principios">
          <div className="marquee-track">
            {["DOBLE SMASH", "PATATA CRUJIENTE", "SALSA DE LA CASA", "HECHO AL MOMENTO", "DOBLE SMASH", "PATATA CRUJIENTE", "SALSA DE LA CASA", "HECHO AL MOMENTO"].map((text, index) => (
              <span key={`${text}-${index}`}>{text} <b>✳</b></span>
            ))}
          </div>
        </section>

        <section className="menu-section" id="carta">
          <div className="section-heading menu-heading">
            <div><span className="section-kicker">01 / LA CARTA</span><h2>Elige tu <i>antojo.</i></h2></div>
            <p>Todos los ingredientes entran con una misión: hacer que el siguiente bocado importe.</p>
          </div>

          <div className="category-tabs" role="tablist" aria-label="Filtrar carta">
            {(["Todos", "Burgers", "Combos", "Sides"] as Category[]).map((tab) => (
              <button key={tab} onClick={() => setCategory(tab)} className={category === tab ? "active" : ""} role="tab" aria-selected={category === tab}>
                {tab === "Sides" ? "Para picar" : tab}
              </button>
            ))}
          </div>

          <div className="menu-layout">
            <div className="product-rail">
              {filteredItems.map((item, index) => (
                <article key={item.id} className={`food-card food-card-${item.tone} ${index === 0 ? "featured" : ""}`}>
                  <div className="card-art">
                    {item.image ? <img src={item.image} alt={item.name} /> : <div className="graphic-food" aria-hidden="true"><span>{item.illustration}</span><i></i><b></b></div>}
                    <span className="card-number">0{menuItems.indexOf(item) + 1}</span>
                  </div>
                  <div className="card-content">
                    <span className="ticket-tag">{item.tag}</span>
                    <div className="food-title"><h3>{item.name}</h3><strong>{formatPrice(item.price)}</strong></div>
                    <p>{item.description}</p>
                    <button className="add-button" onClick={() => addToCart(item)}>
                      <span>Añadir</span><Plus size={18} aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="desk-ticket" aria-label="Resumen de comanda">
              <div className="ticket-top"><span>COMANDA</span><span>#{String(itemCount + 21).padStart(3, "0")}</span></div>
              <h3>{itemCount ? "Eso promete." : "El hambre llama."}</h3>
              <p>{itemCount ? `${itemCount} ${itemCount === 1 ? "elección" : "elecciones"} en tu bandeja.` : "Elige algo de la carta para empezar."}</p>
              <div className="ticket-divider" />
              <div className="ticket-total"><span>Total visual</span><strong>{formatPrice(total)}</strong></div>
              <Button className="ticket-button" onClick={() => setCartOpen(true)}>{itemCount ? "Ver mi comanda" : "Explorar carta"} <ShoppingBag size={17} /></Button>
              <small><Zap size={13} /> Diseño de demostración</small>
            </aside>
          </div>
        </section>

        <section className="combo-section" id="combina">
          <div className="combo-text">
            <span className="section-kicker light">02 / TU COMBO</span>
            <h2>Hazlo a tu <i>manera.</i></h2>
            <p>Una burger, una montaña de patatas y el nivel exacto de fuego para tu día.</p>
            <div className="heat-picker">
              <div className="heat-label"><span>Nivel de fuego</span><strong>{heat}/3</strong></div>
              <div className="heat-options">
                {[1, 2, 3].map((level) => <button key={level} className={heat >= level ? "lit" : ""} onClick={() => { setHeat(level); setNotice(`Fuego ajustado a nivel ${level}.`); }} aria-label={`Nivel de fuego ${level}`}><Flame size={23} fill={heat >= level ? "currentColor" : "none"} /></button>)}
              </div>
              <div className="heat-caption"><span>Suave</span><span>Explosivo</span></div>
            </div>
            <Button className="combo-button" onClick={pickCombo}>Sumar el combo <Plus size={18} /></Button>
          </div>
          <div className="combo-poster">
            <div className="poster-flag">NO<br />COMPARTIR</div>
            <img src={friesImage} alt="Patatas cargadas con cheddar y jalapeño" />
            <div className="poster-type">MÁS<br /><span>FUEGO</span></div>
            <div className="poster-chip">desde 14,90 €</div>
          </div>
        </section>

        <section className="service-section" id="hora">
          <div className="service-card service-time">
            <div className="service-icon"><Clock3 size={25} /></div>
            <span className="section-kicker">RITMO DEL DÍA</span>
            <h2>Cuando el antojo<br />no espera.</h2>
            <p><strong>Domingo a jueves</strong> · 12:30 — 23:30<br /><strong>Viernes y sábado</strong> · 12:30 — 00:30</p>
          </div>
          <div className="service-card service-location">
            <div className="map-dots" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
            <div className="location-info"><span className="section-kicker">NUESTRA ESQUINA</span><h2>Calle del<br />Antojo, 17.</h2><button onClick={() => setNotice("Ubicación guardada solo como demostración de diseño.")}>Guardar ubicación <ArrowUp size={15} /></button></div>
            <div className="map-pin"><MapPin size={30} fill="currentColor" /></div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#inicio"><span className="brand-mark"><img src={markImage} alt="" /></span><span className="brand-copy"><strong>Sabor</strong><em>Express</em></span></a>
        <p>Hamburguesas sin excusas.</p>
        <span>© 2026 · MAQUETA VISUAL</span>
      </footer>

      <p className="notice" aria-live="polite"><Check size={15} /> {notice}</p>

      <button className="mobile-cart-bar" onClick={() => setCartOpen(true)}>
        <span className="mobile-cart-icon"><ShoppingBag size={18} /><b>{itemCount}</b></span>
        <span>{itemCount ? "Ver mi comanda" : "Tu comanda"}</span>
        <strong>{formatPrice(total)}</strong>
      </button>

      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent className="order-sheet">
          <SheetHeader className="order-sheet-head">
            <span className="section-kicker">TU BANDEJA</span>
            <SheetTitle>{itemCount ? "La comanda va tomando forma." : "Aquí caerá lo bueno."}</SheetTitle>
            <SheetDescription>{itemCount ? "Ajusta cantidades para seguir jugando con el diseño." : "La carta está lista cuando tú lo estés."}</SheetDescription>
          </SheetHeader>
          <div className="order-lines">
            {cartItems.length === 0 ? (
              <div className="empty-order"><UtensilsCrossed size={34} /><p>Todavía no has elegido nada.</p><button onClick={() => { setCartOpen(false); scrollToMenu(); }}>Ver la carta <ArrowDown size={16} /></button></div>
            ) : cartItems.map((item) => (
              <div className="order-line" key={item.id}>
                <div className={`order-swatch swatch-${item.tone}`}>{item.image ? <img src={item.image} alt="" /> : item.illustration}</div>
                <div className="order-name"><strong>{item.name}</strong><span>{formatPrice(item.price)}</span></div>
                <div className="quantity-control"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Quitar una unidad de ${item.name}`}><Minus size={14} /></button><b>{item.quantity}</b><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Añadir una unidad de ${item.name}`}><Plus size={14} /></button></div>
              </div>
            ))}
          </div>
          <SheetFooter className="order-footer">
            <div className="order-total"><span>Total visual</span><strong>{formatPrice(total)}</strong></div>
            <Button onClick={() => { setNotice("Esta es una maqueta: no se ha creado ningún pedido."); setCartOpen(false); }} disabled={!itemCount} className="finish-button">Finalizar simulación <ArrowUp size={17} /></Button>
            <small><Zap size={13} /> No se procesan pagos ni pedidos reales.</small>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
