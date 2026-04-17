import { useState } from "react";
import Icon from "@/components/ui/icon";

const HeroImage = "https://cdn.poehali.dev/projects/b25e9160-aa10-43c3-8d6b-30209f0a43f2/files/efa4fdfa-5926-406c-9463-88473f897f8c.jpg";

const NAV_ITEMS = [
  { id: "schedule", label: "Расписание" },
  { id: "circles", label: "Кружки" },
  { id: "events", label: "Афиша" },
  { id: "news", label: "Новости" },
  { id: "history", label: "История" },
  { id: "contacts", label: "Контакты" },
];

const SCHEDULE = [
  { day: "Понедельник", items: ["09:00 — Хор «Берёзка» (ансамблевый зал)", "15:00 — Кружок рукоделия (мастерская)", "18:00 — Танцевальная студия «Ритм» (большой зал)"] },
  { day: "Вторник", items: ["10:00 — Изостудия для детей (мастерская)", "16:00 — Театральный кружок (малый зал)", "19:00 — Клуб настольных игр (фойе)"] },
  { day: "Среда", items: ["09:00 — Хор «Берёзка» (ансамблевый зал)", "14:00 — Кружок кройки и шитья (мастерская)", "17:00 — Занятия по фольклору (малый зал)"] },
  { day: "Четверг", items: ["10:00 — Детская театральная студия (малый зал)", "16:00 — Ансамбль гармонистов (ансамблевый зал)", "19:00 — Киноклуб (большой зал)"] },
  { day: "Пятница", items: ["15:00 — Изостудия для взрослых (мастерская)", "18:00 — Танцевальная студия «Ритм» (большой зал)", "20:00 — Репетиция молодёжного театра"] },
  { day: "Суббота", items: ["11:00 — Мастер-класс по народным ремёслам", "15:00 — Детский клуб «Солнышко»", "18:00 — Концерт / мероприятие (по расписанию)"] },
];

const CIRCLES = [
  { icon: "Music", name: "Хор «Берёзка»", desc: "Народный хоровой коллектив, лауреат областных конкурсов. Принимаем участников от 16 лет.", age: "16+", days: "Пн, Ср" },
  { icon: "Theater", name: "Театральная студия", desc: "Взрослые и детские группы. Ставим классику и современные пьесы, выступаем на районных фестивалях.", age: "7+", days: "Вт, Чт" },
  { icon: "Palette", name: "Изостудия", desc: "Живопись, графика, декоративно-прикладное искусство. Занятия для детей и взрослых.", age: "6+", days: "Вт, Пт" },
  { icon: "Scissors", name: "Кружок рукоделия", desc: "Вязание, вышивка, квилтинг. Мастера делятся секретами народного ремесла.", age: "12+", days: "Пн, Ср" },
  { icon: "Footprints", name: "Танцевальная студия «Ритм»", desc: "Народные и эстрадные танцы, постановка номеров для праздничных концертов.", age: "5+", days: "Пн, Пт" },
  { icon: "Mic2", name: "Ансамбль гармонистов", desc: "Сохраняем традиции народной музыки. Приглашаем всех, кто умеет играть или хочет научиться.", age: "14+", days: "Чт" },
];

const EVENTS = [
  { date: "25 апреля", title: "Вечер русского романса", desc: "Концерт хора «Берёзка» с программой «Весенние напевы». Вход свободный.", type: "Концерт" },
  { date: "1 мая", title: "Праздник весны и труда", desc: "Народные гуляния, игры, выступления творческих коллективов у Дома культуры.", type: "Праздник" },
  { date: "9 мая", title: "День Победы", desc: "Торжественный концерт, минута молчания, выступление ветеранских ансамблей.", type: "Торжество" },
  { date: "17 мая", title: "Мастер-класс по гончарному делу", desc: "Опытный мастер расскажет и покажет основы лепки из глины. Запись обязательна.", type: "Мастер-класс" },
  { date: "24 мая", title: "День славянской письменности", desc: "Литературный вечер, конкурс каллиграфии, выставка детских рисунков.", type: "Конкурс" },
  { date: "1 июня", title: "День защиты детей", desc: "Праздник для детей и родителей: конкурсы, аниматоры, подарки.", type: "Праздник" },
];

const NEWS = [
  { date: "15 апреля 2026", title: "Хор «Берёзка» занял I место на областном фестивале", text: "Наш коллектив вернулся с Областного фестиваля народного творчества в Екатеринбурге с дипломом первой степени. Поздравляем участников и руководителя Нину Александровну Кузнецову!" },
  { date: "10 апреля 2026", title: "Объявляется набор в детскую театральную студию", text: "Приглашаем детей от 7 до 14 лет. Занятия по вторникам и четвергам с 16:00. Развиваем речь, память, артистизм. Запись по телефону или лично в ДК." },
  { date: "5 апреля 2026", title: "Обновлён репертуар танцевальной студии «Ритм»", text: "Студия подготовила три новых номера к летнему концертному сезону. В программе — народные танцы Урала и современная хореография для всех возрастов." },
  { date: "28 марта 2026", title: "Ремонт малого зала завершён", text: "Благодаря поддержке районной администрации в малом зале обновлён паркет и заменено освещение. Теперь занятия для детских групп проходят в обновлённом пространстве." },
];

const typeColor: Record<string, string> = {
  "Концерт": "bg-[#d4e8d4] text-[#2d5a35]",
  "Праздник": "bg-[#fce8c8] text-[#7a4a10]",
  "Торжество": "bg-[#e8d4d4] text-[#7a2a2a]",
  "Мастер-класс": "bg-[#d4dce8] text-[#2a3d6b]",
  "Конкурс": "bg-[#e8e4d4] text-[#5a4a1a]",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("schedule");
  const [openDay, setOpenDay] = useState<string | null>("Понедельник");
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dk-beige)", color: "var(--dk-text)" }}>

      {/* Шапка */}
      <header className="sticky top-0 z-50 shadow-sm" style={{ background: "var(--dk-green)", color: "var(--dk-beige)" }}>
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Icon name="TreePine" size={18} />
            </div>
            <div>
              <p className="font-cormorant font-semibold text-lg leading-tight">Дом Культуры</p>
              <p className="text-xs opacity-75 leading-tight">д. Ключи, Сысертский округ</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="px-3 py-1.5 rounded-md text-sm font-golos transition-all duration-200"
                style={{
                  background: activeSection === item.id ? "rgba(255,255,255,0.2)" : "transparent",
                  color: "var(--dk-beige)",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Герой */}
      <section className="relative overflow-hidden">
        <div className="relative h-[420px] md:h-[500px]">
          <img
            src={HeroImage}
            alt="Дом культуры деревни Ключи"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(61,102,69,0.35) 0%, rgba(30,50,35,0.7) 100%)" }} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <p className="text-sm font-golos tracking-widest uppercase mb-3 animate-fade-in" style={{ color: "rgba(243,237,224,0.85)" }}>
              Сысертский округ · Свердловская область
            </p>
            <h1 className="font-cormorant font-light text-5xl md:text-7xl mb-4 animate-slide-up" style={{ color: "var(--dk-beige)", animationDelay: "0.1s" }}>
              Дом Культуры
            </h1>
            <p className="font-cormorant italic text-2xl md:text-3xl animate-slide-up" style={{ color: "rgba(243,237,224,0.9)", animationDelay: "0.2s" }}>
              деревня Ключи
            </p>
            <div className="mt-8 flex gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <button
                onClick={() => scrollTo("events")}
                className="px-6 py-3 rounded-lg font-golos font-medium text-sm transition-all hover:scale-105"
                style={{ background: "var(--dk-beige)", color: "var(--dk-green)" }}
              >
                Афиша событий
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="px-6 py-3 rounded-lg font-golos font-medium text-sm transition-all hover:scale-105 border"
                style={{ borderColor: "rgba(243,237,224,0.5)", color: "var(--dk-beige)" }}
              >
                Связаться с нами
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Быстрая навигация мобильная */}
      <div className="md:hidden overflow-x-auto sticky top-14 z-40 shadow" style={{ background: "var(--dk-beige-dark)" }}>
        <div className="flex gap-1 px-3 py-2 min-w-max">
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="px-3 py-1.5 rounded-full text-xs font-golos whitespace-nowrap transition-all"
              style={{
                background: activeSection === item.id ? "var(--dk-green)" : "transparent",
                color: activeSection === item.id ? "var(--dk-beige)" : "var(--dk-text)",
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-20">

        {/* Расписание */}
        <section id="schedule" className="scroll-mt-20">
          <SectionTitle icon="CalendarDays" title="Расписание занятий" subtitle="Еженедельное расписание кружков и студий" />
          <div className="mt-8 space-y-3">
            {SCHEDULE.map(({ day, items }) => (
              <div key={day} className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--dk-beige-dark)", background: "white" }}>
                <button
                  className="w-full flex items-center justify-between px-5 py-4 font-golos font-medium text-left transition-all hover:brightness-95"
                  style={{
                    background: openDay === day ? "var(--dk-green)" : "white",
                    color: openDay === day ? "var(--dk-beige)" : "var(--dk-text)"
                  }}
                  onClick={() => setOpenDay(openDay === day ? null : day)}
                >
                  <span>{day}</span>
                  <Icon name={openDay === day ? "ChevronUp" : "ChevronDown"} size={16} />
                </button>
                {openDay === day && (
                  <div className="px-5 py-4 space-y-2">
                    {items.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm font-golos">
                        <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: "var(--dk-green)" }} />
                        <span style={{ color: "var(--dk-text)" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Кружки */}
        <section id="circles" className="scroll-mt-20">
          <SectionTitle icon="Users" title="Кружки и студии" subtitle="Творческие коллективы Дома культуры" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {CIRCLES.map(({ icon, name, desc, age, days }) => (
              <div
                key={name}
                className="rounded-2xl p-5 border transition-all hover:shadow-md hover:-translate-y-0.5"
                style={{ background: "white", borderColor: "var(--dk-beige-dark)" }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "#d4e8d4" }}>
                    <Icon name={icon} size={20} fallback="Star" style={{ color: "var(--dk-green)" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-cormorant font-semibold text-lg leading-tight mb-1">{name}</h3>
                    <p className="text-sm font-golos mb-3 leading-relaxed" style={{ color: "#6b5a45" }}>{desc}</p>
                    <div className="flex items-center gap-3 text-xs font-golos">
                      <span className="px-2 py-0.5 rounded-full" style={{ background: "#d4e8d4", color: "var(--dk-green)" }}>Возраст: {age}</span>
                      <span className="px-2 py-0.5 rounded-full" style={{ background: "var(--dk-beige-dark)", color: "#6b5a45" }}>📅 {days}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Афиша */}
        <section id="events" className="scroll-mt-20">
          <SectionTitle icon="Ticket" title="Афиша" subtitle="Предстоящие события и мероприятия" />
          <div className="mt-8 space-y-4">
            {EVENTS.map(({ date, title, desc, type }) => (
              <div
                key={title}
                className="rounded-2xl p-5 border flex gap-5 items-start transition-all hover:shadow-md"
                style={{ background: "white", borderColor: "var(--dk-beige-dark)" }}
              >
                <div className="flex-shrink-0 text-center w-16">
                  <div className="font-cormorant font-bold text-2xl leading-tight" style={{ color: "var(--dk-green)" }}>
                    {date.split(" ")[0]}
                  </div>
                  <div className="text-xs font-golos mt-0.5" style={{ color: "#6b5a45" }}>
                    {date.split(" ").slice(1).join(" ")}
                  </div>
                </div>
                <div className="w-px self-stretch flex-shrink-0" style={{ background: "var(--dk-beige-dark)" }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-1.5">
                    <h3 className="font-cormorant font-semibold text-lg leading-tight">{title}</h3>
                    <span className={`flex-shrink-0 text-xs font-golos px-2 py-0.5 rounded-full ${typeColor[type] || "bg-gray-100 text-gray-600"}`}>{type}</span>
                  </div>
                  <p className="text-sm font-golos leading-relaxed" style={{ color: "#6b5a45" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* Новости */}
        <section id="news" className="scroll-mt-20">
          <SectionTitle icon="Newspaper" title="Новости и объявления" subtitle="Последние события жизни ДК" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {NEWS.map(({ date, title, text }) => (
              <div
                key={title}
                className="rounded-2xl p-5 border flex flex-col gap-2 hover:shadow-md transition-all"
                style={{ background: "white", borderColor: "var(--dk-beige-dark)" }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--dk-green)" }} />
                  <span className="text-xs font-golos" style={{ color: "#6b5a45" }}>{date}</span>
                </div>
                <h3 className="font-cormorant font-semibold text-lg leading-snug">{title}</h3>
                <p className="text-sm font-golos leading-relaxed" style={{ color: "#6b5a45" }}>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <Divider />

        {/* История */}
        <section id="history" className="scroll-mt-20">
          <SectionTitle icon="BookOpen" title="История ДК" subtitle="Путь длиною в десятилетия" />
          <div className="mt-8 rounded-2xl overflow-hidden border" style={{ borderColor: "var(--dk-beige-dark)", background: "white" }}>
            <div className="p-6 md:p-8 space-y-5">
              <p className="font-cormorant text-xl italic leading-relaxed" style={{ color: "var(--dk-green)" }}>
                «Культура — это то, что остаётся, когда всё остальное забыто»
              </p>
              <div className="space-y-4 font-golos text-sm leading-relaxed" style={{ color: "#4a3a2a" }}>
                <p>
                  Дом культуры деревни Ключи был основан в <strong>1958 году</strong> как центр культурной и общественной жизни сельского поселения. С первых лет своей работы ДК стал местом, где жители округа могли собираться вместе, творить и отдыхать.
                </p>
                <p>
                  В <strong>1970-х годах</strong> при ДК были созданы первые творческие коллективы: хоровой кружок, драматический театр и танцевальный ансамбль. Их постановки регулярно показывались на районных смотрах художественной самодеятельности и неизменно получали высокие оценки.
                </p>
                <p>
                  В <strong>1990-е годы</strong>, несмотря на трудности, коллектив ДК сохранил главные традиции. Именно в этот период был основан хор «Берёзка», ставший визитной карточкой Ключей на областных и всероссийских фестивалях.
                </p>
                <p>
                  Сегодня Дом культуры объединяет более <strong>200 участников</strong> кружков и студий всех возрастов. Ежегодно ДК проводит свыше 50 мероприятий — от детских утренников до торжественных концертов.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                {[["1958", "Год основания"], ["200+", "Участников"], ["50+", "Мероприятий в год"]].map(([num, label]) => (
                  <div key={label} className="text-center p-4 rounded-xl" style={{ background: "var(--dk-beige)" }}>
                    <div className="font-cormorant font-bold text-3xl" style={{ color: "var(--dk-green)" }}>{num}</div>
                    <div className="text-xs font-golos mt-1" style={{ color: "#6b5a45" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Контакты */}
        <section id="contacts" className="scroll-mt-20">
          <SectionTitle icon="MapPin" title="Контакты" subtitle="Мы всегда рады вашим вопросам и предложениям" />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="space-y-4">
              <div className="rounded-2xl p-6 border" style={{ background: "white", borderColor: "var(--dk-beige-dark)" }}>
                <h3 className="font-cormorant font-semibold text-lg mb-4">Как нас найти</h3>
                <div className="space-y-3">
                  {[
                    { icon: "MapPin", text: "д. Ключи, ул. Советская, д. 12, Сысертский округ, Свердловская область" },
                    { icon: "Phone", text: "+7 (343) 000-00-00" },
                    { icon: "Mail", text: "dk-klyuchi@mail.ru" },
                    { icon: "Clock", text: "Пн–Пт: 9:00–21:00\nСб: 10:00–20:00\nВс: выходной" },
                  ].map(({ icon, text }) => (
                    <div key={icon} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: "#d4e8d4" }}>
                        <Icon name={icon} size={15} style={{ color: "var(--dk-green)" }} />
                      </div>
                      <span className="text-sm font-golos pt-1 leading-relaxed" style={{ color: "#4a3a2a", whiteSpace: "pre-line" }}>{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl p-6 border" style={{ background: "white", borderColor: "var(--dk-beige-dark)" }}>
              <h3 className="font-cormorant font-semibold text-lg mb-4">Обратная связь</h3>
              {formSent ? (
                <div className="flex flex-col items-center justify-center py-8 gap-3 text-center">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "#d4e8d4" }}>
                    <Icon name="Check" size={22} style={{ color: "var(--dk-green)" }} />
                  </div>
                  <p className="font-cormorant text-xl">Сообщение отправлено!</p>
                  <p className="text-sm font-golos" style={{ color: "#6b5a45" }}>Мы свяжемся с вами в ближайшее время.</p>
                  <button className="mt-2 text-sm font-golos underline" style={{ color: "var(--dk-green)" }} onClick={() => setFormSent(false)}>Отправить ещё</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-golos mb-1.5" style={{ color: "#6b5a45" }}>Ваше имя</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-golos border outline-none transition-colors"
                      style={{ borderColor: "var(--dk-beige-dark)", background: "var(--dk-beige)", color: "var(--dk-text)" }}
                      placeholder="Иван Иванов"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-golos mb-1.5" style={{ color: "#6b5a45" }}>Телефон</label>
                    <input
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-golos border outline-none transition-colors"
                      style={{ borderColor: "var(--dk-beige-dark)", background: "var(--dk-beige)", color: "var(--dk-text)" }}
                      placeholder="+7 (___) ___-__-__"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-golos mb-1.5" style={{ color: "#6b5a45" }}>Сообщение</label>
                    <textarea
                      className="w-full px-4 py-2.5 rounded-xl text-sm font-golos border outline-none transition-colors resize-none"
                      style={{ borderColor: "var(--dk-beige-dark)", background: "var(--dk-beige)", color: "var(--dk-text)" }}
                      rows={3}
                      placeholder="Ваш вопрос или предложение..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-golos font-medium text-sm transition-all hover:brightness-105 active:scale-[0.98]"
                    style={{ background: "var(--dk-green)", color: "var(--dk-beige)" }}
                  >
                    Отправить сообщение
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      {/* Подвал */}
      <footer className="mt-16 py-8" style={{ background: "var(--dk-green)", color: "rgba(243,237,224,0.8)" }}>
        <div className="max-w-5xl mx-auto px-4 text-center space-y-2">
          <p className="font-cormorant text-xl" style={{ color: "var(--dk-beige)" }}>Дом Культуры · деревня Ключи</p>
          <p className="text-xs font-golos">Сысертский округ · Свердловская область</p>
          <p className="text-xs font-golos opacity-60 pt-2">© 2026 Дом культуры деревни Ключи</p>
        </div>
      </footer>
    </div>
  );
}

function SectionTitle({ icon, title, subtitle }: { icon: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 mt-1" style={{ background: "var(--dk-green)" }}>
        <Icon name={icon} size={20} fallback="Star" style={{ color: "var(--dk-beige)" }} />
      </div>
      <div>
        <h2 className="font-cormorant font-semibold text-3xl leading-tight">{title}</h2>
        <p className="font-golos text-sm mt-0.5" style={{ color: "#6b5a45" }}>{subtitle}</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 h-px" style={{ background: "var(--dk-beige-dark)" }} />
      <Icon name="Leaf" size={14} style={{ color: "var(--dk-green)", opacity: 0.6 }} />
      <div className="flex-1 h-px" style={{ background: "var(--dk-beige-dark)" }} />
    </div>
  );
}