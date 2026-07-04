import axios from 'axios';
import type { ArticuloMedico } from '../types';

const ARTICULOS_FALLBACK: ArticuloMedico[] = [
  {
    id: 1,
    titulo: '¿Cómo saber si tengo cálculos en la vesícula? 5 síntomas clave',
    slug: 'como-saber-si-tengo-calculos-en-la-vesicula-sintomas',
    resumen: 'El dolor abdominal después de comer grasas no siempre es indigestión común. Conoce las señales de alarma de la colelitiasis y por qué la cirugía temprana evita emergencias.',
    contenidoHtml: `
      <p class="lead font-medium text-slate-700 dark:text-slate-300 mb-6">
        Los cálculos biliares o piedras en la vesícula (colelitiasis) son una de las afecciones digestivas más frecuentes en nuestro país. Muchas veces, los pacientes confunden los síntomas iniciales con una simple gastritis o indigestión pasajera, retrasando una evaluación médica especializada que podría prevenir complicaciones graves como pancreatitis o colecistitis aguda.
      </p>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">1. Dolor en el lado derecho del abdomen (Cólico Biliar)</h3>
      <p class="mb-4">
        El síntoma más característico es un dolor intenso, punzante u opresivo en la parte superior derecha del abdomen, justo debajo de las costillas. Este dolor suele desencadenarse entre 30 minutos y 2 horas después de ingerir comidas copiosas o ricas en grasas (frituras, lácteos enteros, carnes rojas). En ocasiones, el dolor se irradia hacia la espalda o el hombro derecho.
      </p>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">2. Náuseas persistentes y vómitos biliosos</h3>
      <p class="mb-4">
        Cuando un cálculo obstruye el conducto cístico, la bilis no puede fluir correctamente para digerir los alimentos. Esto genera una sensación de náusea profunda y vómitos de color amarillento o verdoso que no alivian completamente el malestar.
      </p>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">3. Intolerancia a las grasas y digestión lenta</h3>
      <p class="mb-4">
        Si notas que cada vez que comes huevo, frituras o aderezos experimentas hinchazón abdominal, gases excesivos y pesadez que dura varias horas, es probable que tu vesícula no esté contrayéndose de forma adecuada debido a la presencia de cálculos o lodo biliar.
      </p>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">4. Coloración amarillenta en ojos o piel (Ictericia)</h3>
      <p class="mb-4">
        <strong>⚠️ Señal de alerta médica:</strong> Si el color blanco de tus ojos adquiere un tono amarillo, la orina se vuelve oscura (color té) y las heces son muy claras, significa que un cálculo ha migrado y está bloqueando el conducto biliar principal (colédoco). Esta es una urgencia quirúrgica que requiere atención especializada inmediata.
      </p>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">5. Fiebre y escalofríos asociados a dolor abdominal</h3>
      <p class="mb-4">
        La combinación de fiebre, escalofríos y dolor en el hipocondrio derecho indica que la vesícula se ha infectado (colecistitis aguda). No recurras al automedicamiento con analgésicos fuertes, ya que pueden enmascarar el cuadro y llevar a una perforación vesicular.
      </p>

      <div class="bg-medical-50 dark:bg-navy-900/80 p-6 rounded-2xl border-l-4 border-medical-500 my-8">
        <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Recomendación del Dr. Juan Carlos Marcos Enriquez:</h4>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          "El tratamiento de elección y definitivo para los cálculos vesiculares es la <strong>Colecistectomía Laparoscópica</strong>. Realizada a tiempo y de forma programada, es una intervención ultra-segura de mínima invasión, con micro-incisiones de 5 a 10 mm que permiten el alta médica en tan solo 24 horas y una rápida reincorporación a tu rutina laboral."
        </p>
      </div>
    `,
    imagenPortadaUrl: '/WhatsApp Image 2026-07-02 at 12.36.06 PM (2).jpeg',
    categoria: { id: 1, nombre: 'Cirugía de Vesícula', slug: 'cirugia-de-vesicula' },
    fechaPublicacion: '02 de Julio, 2026',
    autor: 'Dr. Juan Carlos Marcos Enriquez',
    tiempoLectura: 4,
    vistas: 342,
    publicadoEnWeb: true,
  },
  {
    id: 2,
    titulo: 'Hernia Inguinal o Abdominal: ¿Por qué nunca se curan solas y cuándo operar?',
    slug: 'hernia-inguinal-o-abdominal-por-que-nunca-se-curan-solas',
    resumen: 'Un bulto en la ingle o el ombligo es señal de una debilidad en la pared muscular. Descubre los riesgos del estrangulamiento y las ventajas de la plastía con malla sin tensión.',
    contenidoHtml: `
      <p class="lead font-medium text-slate-700 dark:text-slate-300 mb-6">
        Una hernia ocurre cuando un órgano interno (generalmente una porción del intestino) empuja a través de un punto débil o un desgarro en el músculo o tejido que lo contiene. El mito más peligroso es pensar que con fajas, reposo o cremas el bulto desaparecerá. En cirugía general, es una máxima médica: <strong>una hernia jamás se cura sola; con el tiempo solo crece y aumenta su riesgo.</strong>
      </p>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">¿Cuáles son los síntomas más comunes?</h3>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-slate-600 dark:text-slate-300">
        <li>Aparición de un bulto o protuberancia visible en la ingle (hernia inguinal), el ombligo (hernia umbilical) o en una cicatriz de cirugía previa (hernia incisional o eventración).</li>
        <li>Sensación de ardor, dolor o pesadez en la zona, especialmente al toser, levantar objetos pesados, agacharse o permanecer de pie muchas horas.</li>
        <li>El bulto desaparece cuando te acuestas boca arriba (hernia reductible), pero vuelve a salir al ponerte de pie.</li>
      </ul>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">El gran peligro: Hernia Incarcerada o Estrangulada</h3>
      <p class="mb-4">
        Si el intestino queda atrapado dentro del orificio de la hernia y no puede regresar a la cavidad abdominal, el flujo sanguíneo se corta (estrangulamiento). Esto provoca una necrosis del tejido intestinal en cuestión de horas, convirtiendo una cirugía rutinaria en una emergencia vital con riesgo de peritonitis.
      </p>

      <div class="bg-medical-50 dark:bg-navy-900/80 p-6 rounded-2xl border-l-4 border-medical-500 my-8">
        <h4 class="font-bold text-slate-900 dark:text-white text-base mb-2">Filosofía de Mínima Invasión (Plastía con Malla):</h4>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          "En nuestra práctica quirúrgica empleamos técnicas laparoscópicas avanzadas con colocación de mallas protésicas biocompatibles libres de tensión. Esto refuerza la pared muscular desde el interior, reduciendo la tasa de reaparición a casi 0% y garantizando que el paciente camine sin dolor el mismo día de la intervención."
        </p>
      </div>
    `,
    imagenPortadaUrl: '/WhatsApp Image 2026-07-02 at 12.36.06 PM (4).jpeg',
    categoria: { id: 2, nombre: 'Hernias y Pared Abdominal', slug: 'hernias' },
    fechaPublicacion: '28 de Junio, 2026',
    autor: 'Dr. Juan Carlos Marcos Enriquez',
    tiempoLectura: 5,
    vistas: 518,
    publicadoEnWeb: true,
  },
  {
    id: 3,
    titulo: 'Dieta y cuidados postoperatorios: ¿Qué comer tras una cirugía digestiva?',
    slug: 'dieta-y-cuidados-postoperatorios-que-comer-tras-cirugia-digestiva',
    resumen: 'Guía práctica para una recuperación óptima en casa. Alimentos permitidos, hidratación y cómo cuidar tus cicatrices laparoscópicas durante la primera semana.',
    contenidoHtml: `
      <p class="lead font-medium text-slate-700 dark:text-slate-300 mb-6">
        El éxito de una cirugía no termina al salir del quirófano. El postoperatorio en el hogar es una etapa fundamental donde una correcta alimentación y cuidados de herida aceleran la cicatrización tisular y evitan molestias digestivas.
      </p>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Fase 1: Primeras 48 horas (Dieta Blanda y Baja en Grasas)</h3>
      <p class="mb-4">
        Tras una cirugía digestiva por laparoscopia, el intestino necesita readaptarse gradualmente:
      </p>
      <ul class="list-disc pl-6 space-y-2 mb-6 text-slate-600 dark:text-slate-300">
        <li><strong>Alimentos recomendados:</strong> Caldos desgrasados, sopas de verduras licuadas, compota de manzana, gelatina, pollo sancochado o a la plancha desmenuzado, arroz blanco y tostadas.</li>
        <li><strong>Hidratación:</strong> Bebe agua, infusiones tibias (manzanilla o anís) en pequeños sorbos frecuentes. Evita usar cañitas o pajitas, ya que introducen aire al estómago.</li>
        <li><strong>Prohibido los primeros días:</strong> Frituras, lácteos enteros (leche, queso, mantequilla), carnes rojas, gaseosas, alcohol, legumbres y condimentos picantes.</li>
      </ul>

      <h3 class="text-xl font-bold text-slate-900 dark:text-white mt-8 mb-4">Cuidado de las micro-incisiones laparoscópicas</h3>
      <p class="mb-4">
        Al ser incisiones de apenas unos milímetros, su cuidado es muy sencillo: puedes ducharte con agua y jabón neutro dejando correr el agua suavemente sobre los apósitos o cicatrices sin frotar. Seca la zona con una toalla limpia dando pequeños toques. No apliques ungüentos ni alcohol sobre las heridas cerradas.
      </p>

      <div class="bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20 my-8">
        <h4 class="font-bold text-emerald-700 dark:text-emerald-400 text-base mb-2">⚡ Ventaja de nuestra Técnica Quirúrgica:</h4>
        <p class="text-sm text-slate-600 dark:text-slate-300">
          "Gracias a nuestro protocolo de analgesia multimodal y suturas estéticas intradérmicas, más del 95% de nuestros pacientes no requieren retirar puntos postoperatorios y reportan una reincorporación confortable a sus actividades cotidianas al quinto día."
        </p>
      </div>
    `,
    imagenPortadaUrl: '/WhatsApp Image 2026-07-02 at 12.36.06 PM (3).jpeg',
    categoria: { id: 3, nombre: 'Cuidados Postoperatorios', slug: 'cuidados-postoperatorios' },
    fechaPublicacion: '15 de Junio, 2026',
    autor: 'Dr. Juan Carlos Marcos Enriquez',
    tiempoLectura: 4,
    vistas: 620,
    publicadoEnWeb: true,
  }
];

export const getArticulosBlog = async (): Promise<ArticuloMedico[]> => {
  try {
    const res = await axios.get('http://localhost:5000/api/blog/articulos', { timeout: 3000 });
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
    return ARTICULOS_FALLBACK;
  } catch {
    console.info('Conexión API Blog falló, usando artículos de respaldo (Fallback)');
    return ARTICULOS_FALLBACK;
  }
};

export const getArticuloBySlug = async (slug: string): Promise<ArticuloMedico | null> => {
  try {
    const res = await axios.get(`http://localhost:5000/api/blog/articulos/${slug}`, { timeout: 3000 });
    if (res.data) {
      return res.data;
    }
  } catch {
    // Buscar en fallback
  }
  return ARTICULOS_FALLBACK.find(a => a.slug === slug) || null;
};
