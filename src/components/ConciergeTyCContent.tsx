interface ConciergeTyCContentProps {
  onScrollToBottom?: () => void;
}

const ConciergeTyCContent = ({ onScrollToBottom }: ConciergeTyCContentProps) => {
  const handleScroll = (e: { currentTarget: HTMLDivElement }) => {
    if (!onScrollToBottom) return;
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 80;
    if (isAtBottom) onScrollToBottom();
  };

  const handleRef = (el: HTMLDivElement | null) => {
    if (!el || !onScrollToBottom) return;
    const { scrollHeight, clientHeight } = el;
    if (scrollHeight <= clientHeight) onScrollToBottom();
  };

  return (
    <div
      ref={handleRef}
      onScroll={handleScroll}
      className="max-h-[600px] overflow-y-auto pr-4 space-y-6 text-sm leading-relaxed"
    >
      <div>
        <h3 className="font-semibold text-base mb-2">
          TÉRMINOS Y CONDICIONES DEL SERVICIO CLOSWORK — PLAN CONCIERGE
        </h3>
        <p>
          <strong>Versión 2.0</strong> · Última actualización: 14 de julio de 2026
        </p>
      </div>

      <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-4">
        <h3 className="font-semibold text-base mb-2">AVISO IMPORTANTE — LEA ANTES DE PAGAR</h3>
        <p>
          Estos Términos y Condiciones (los &quot;<strong>Términos</strong>&quot;) constituyen un contrato de
          prestación de servicios legalmente vinculante entre:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>
            <strong>EL PRESTADOR:</strong> Kevin Daniel De Alba Méndez, por propio derecho, con domicilio en
            Tepic, Nayarit, México, quien opera comercialmente bajo la marca <strong>CLOSWORK</strong>{" "}
            (&quot;Closwork&quot;, &quot;nosotros&quot;); y
          </li>
          <li>
            <strong>EL CLIENTE:</strong> la persona física o moral cuyos datos de identificación fiscal y de
            contacto sean proporcionados al momento de realizar el pago (&quot;usted&quot;, &quot;el
            Cliente&quot;).
          </li>
        </ul>
        <p className="mt-3">
          Conjuntamente, &quot;<strong>las Partes</strong>&quot;.
        </p>
        <p className="mt-3">
          Al marcar la casilla de aceptación y completar el pago a través de la pasarela de Stripe, usted
          manifiesta que:
        </p>
        <ol className="list-decimal list-inside space-y-2 ml-2 mt-3">
          <li>
            Leyó, entendió y acepta íntegramente estos Términos, los cuales sustituyen cualquier acuerdo verbal
            o escrito previo sobre la misma materia;
          </li>
          <li>
            Cuenta con facultades suficientes para obligar a la persona moral que representa, y que dichas
            facultades no le han sido revocadas ni limitadas;
          </li>
          <li>
            Los datos que proporciona (denominación o razón social, RFC, domicilio fiscal, nombre del
            representante, correo electrónico y teléfono) son verdaderos, completos y actuales; y
          </li>
          <li>
            Reconoce que su aceptación electrónica y el registro del pago producen los mismos efectos jurídicos
            que una firma autógrafa, en términos de los artículos 89 a 114 del Código de Comercio en materia de
            mensajes de datos.
          </li>
        </ol>
        <p className="mt-3 font-medium">Si no está de acuerdo con estos Términos, no realice el pago.</p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">1. DEFINICIONES</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4 font-semibold">Término</th>
                <th className="py-2 font-semibold">Significado</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Servicio</td>
                <td className="py-2">
                  Los servicios descritos en la Cláusula 3, con las exclusiones de la Cláusula 4.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Closer</td>
                <td className="py-2">
                  Profesional independiente de ventas, certificado y validado por Closwork, que es presentado y
                  colocado con el Cliente para atender su proceso de cierre comercial.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Colocación</td>
                <td className="py-2">
                  El acto de presentar e incorporar a un Closer a la operación del Cliente.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Suscripción</td>
                <td className="py-2">La contratación recurrente del Servicio con periodicidad mensual.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Datos de Contratación</td>
                <td className="py-2">
                  La información que el Cliente proporciona al momento del pago y que, junto con estos Términos,
                  integra el contrato entre las Partes (ver Cláusula 2.2).
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Comisión del Closer</td>
                <td className="py-2">
                  La retribución variable que el Cliente pacta y paga directamente al Closer por las ventas
                  cerradas.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Formulario de Onboarding</td>
                <td className="py-2">
                  Cuestionario que Closwork entrega al Cliente al inicio del Servicio y que recaba la
                  información indispensable para prestarlo (oferta, ticket, ciclo de venta, leads, comisión del
                  Closer, herramientas, materiales y reglas de operación). Es un requisito indispensable: los
                  plazos a cargo de Closwork no comienzan a correr hasta que el Cliente lo entrega completo.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Onboarding Completo</td>
                <td className="py-2">
                  El momento en que el Cliente ha entregado el Formulario de Onboarding en su totalidad, junto
                  con los accesos y materiales ahí solicitados. Todos los plazos de estos Términos se computan a
                  partir de esta fecha, salvo mención expresa en contrario.
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Día hábil</td>
                <td className="py-2">
                  Cualquier día de lunes a viernes, excluyendo días festivos oficiales en México.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">2. FORMALIZACIÓN DEL CONTRATO</h3>
        <p>
          <strong>2.1. Aceptación.</strong> El contrato entre las Partes se perfecciona en el momento en que el
          Cliente acepta estos Términos y Stripe confirma exitosamente el primer cargo.
        </p>
        <p className="mt-2">
          <strong>2.2. Datos de Contratación.</strong> Los datos capturados por el Cliente en el proceso de pago
          sustituyen, para todos los efectos legales, a la carátula y al apartado de declaraciones de un
          contrato tradicional, y son los siguientes:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
          <li>Denominación o razón social / nombre completo;</li>
          <li>Registro Federal de Contribuyentes (RFC) y régimen fiscal;</li>
          <li>Domicilio fiscal completo;</li>
          <li>Nombre y cargo de la persona que acepta en representación del Cliente;</li>
          <li>Correo electrónico y teléfono de contacto.</li>
        </ul>
        <p className="mt-2">
          <strong>2.3. Comprobante y versionado.</strong> Closwork conservará constancia electrónica de la
          aceptación (fecha, hora, versión de los Términos aceptada, identificador de la transacción de Stripe
          y, en su caso, dirección IP) y la pondrá a disposición del Cliente cuando éste lo solicite por
          escrito. Cada versión de estos Términos permanecerá disponible en una dirección electrónica permanente
          para consulta del Cliente.
        </p>
        <p className="mt-2">
          <strong>2.4. Veracidad.</strong> La falsedad en los Datos de Contratación, o la falta de facultades de
          quien acepta, faculta a Closwork para rescindir el contrato de inmediato, sin responsabilidad y sin
          devolución de cantidades pagadas, sin perjuicio de las acciones legales que correspondan.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">3. OBJETO Y ALCANCE DEL SERVICIO</h3>
        <p>
          <strong>3.1.</strong> Closwork prestará al Cliente los siguientes servicios profesionales, con el
          alcance y los límites que a continuación se precisan:
        </p>
        <div className="overflow-x-auto mt-3">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-3 font-semibold">#</th>
                <th className="py-2 pr-3 font-semibold">Servicio</th>
                <th className="py-2 font-semibold">Alcance</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b">
                <td className="py-2 pr-3">a)</td>
                <td className="py-2 pr-3">
                  <strong>Diagnóstico inicial</strong> de la oferta, ticket promedio y flujo de leads del
                  Cliente.
                </td>
                <td className="py-2">
                  Una (1) sesión de hasta 90 minutos, por única vez, al inicio del Servicio.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-3">b)</td>
                <td className="py-2 pr-3">
                  <strong>Match y selección</strong> de un Closer cuyo perfil encaje con la vertical y el
                  producto del Cliente.
                </td>
                <td className="py-2">
                  Presentación de uno (1) o dos (2) candidatos. La decisión final de aceptación corresponde al
                  Cliente.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-3">c)</td>
                <td className="py-2 pr-3">
                  <strong>Colocación</strong> de un Closer certificado dentro de la operación del Cliente,
                  incorporándolo a sus leads y materiales.
                </td>
                <td className="py-2">
                  Inducción del Closer al producto y proceso del Cliente por hasta cuatro (4) horas acumuladas.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-3">d)</td>
                <td className="py-2 pr-3">
                  <strong>Supervisión activa y monitoreo de llamadas</strong> del Closer, con ajustes
                  orientados a mejorar el proceso de cierre.
                </td>
                <td className="py-2">
                  Una (1) sesión semanal de revisión de hasta 30 minutos, más la revisión de hasta tres (3)
                  llamadas grabadas por semana, con retroalimentación al Closer.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-3">e)</td>
                <td className="py-2 pr-3">
                  <strong>Reporte de actividad.</strong>
                </td>
                <td className="py-2">Un (1) reporte mensual con métricas de actividad del Closer.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-3">f)</td>
                <td className="py-2 pr-3">
                  <strong>Garantía de arranque</strong> en los términos de la Cláusula 6.
                </td>
                <td className="py-2">—</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-3">g)</td>
                <td className="py-2 pr-3">
                  <strong>Garantía de reemplazo</strong> del Closer en los términos de la Cláusula 7.
                </td>
                <td className="py-2">—</td>
              </tr>
              <tr>
                <td className="py-2 pr-3">h)</td>
                <td className="py-2 pr-3">
                  <strong>Soporte y coordinación</strong> mediante un punto de contacto único para el Cliente y
                  el Closer.
                </td>
                <td className="py-2">
                  Atención en días hábiles, de 9:00 a 18:00 h (zona horaria del centro de México), con tiempo de
                  respuesta objetivo de 24 horas hábiles.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-3">
          <strong>3.2. Actividades accesorias.</strong> Closwork podrá desarrollar actividades secundarias
          inherentes al Servicio que resulten razonablemente necesarias para su cumplimiento, siempre que no se
          encuentren dentro de las exclusiones de la Cláusula 4. Cualquier servicio adicional fuera del alcance
          descrito requerirá acuerdo previo y por escrito y podrá generar contraprestación adicional.
        </p>
        <p className="mt-2">
          <strong>3.3. Estándar de calidad.</strong> Closwork prestará el Servicio con diligencia profesional,
          apego a las disposiciones legales aplicables y bajo estándares de ética en los negocios.
        </p>
        <p className="mt-2">
          <strong>3.4. Inicio de plazos.</strong> Los plazos a cargo de Closwork previstos en estos Términos
          comenzarán a correr a partir del Onboarding Completo, y no desde la fecha de pago. La demora del
          Cliente en entregar el Formulario de Onboarding, los accesos o los materiales suspende, por el mismo
          tiempo, los plazos a cargo de Closwork, sin que ello genere derecho a bonificación, prórroga de la
          Suscripción ni devolución alguna.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">4. EXCLUSIONES EXPRESAS DEL SERVICIO</h3>
        <p>
          <strong>4.1.</strong> Para evitar cualquier ambigüedad, las Partes reconocen expresamente que el
          Servicio <strong>NO comprende</strong>, y Closwork <strong>no está obligado a prestar</strong>,
          ninguna de las siguientes actividades:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-3">
          <li>
            Generación, compra, enriquecimiento o prospección de leads, ni prospección en frío de cualquier
            tipo. <strong>La totalidad de los leads es aportada por el Cliente.</strong>
          </li>
          <li>Agendamiento de citas o funciones de SDR (Sales Development Representative).</li>
          <li>
            El pago de la Comisión del Closer, la cual corre exclusivamente a cargo del Cliente (Cláusula 9).
          </li>
          <li>
            La provisión de CRM, marcador, telefonía, correo corporativo, licencias de software o cualquier
            herramienta tecnológica.
          </li>
          <li>
            El diseño, creación o rediseño de la oferta comercial, la estructura de precios, los guiones de
            venta, las presentaciones o los materiales comerciales del Cliente.
          </li>
          <li>La cobranza, facturación o gestión de las ventas del Cliente.</li>
          <li>La prestación de servicios fuera de días y horarios hábiles.</li>
          <li>
            La exclusividad del Closer respecto de otros clientes de Closwork, salvo pacto expreso, por escrito
            y con contraprestación adicional.
          </li>
          <li>Cualquier garantía de resultado comercial, en términos de la Cláusula 5.</li>
        </ol>
        <p className="mt-3">
          <strong>4.2.</strong> Ninguna manifestación verbal, correo, presentación comercial o comunicación de
          cualquier representante o colaborador de Closwork podrá ampliar el alcance del Servicio ni crear
          obligaciones distintas a las expresamente contenidas en estos Términos.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">5. NATURALEZA DEL SERVICIO — OBLIGACIÓN DE MEDIOS</h3>
        <p>
          <strong>5.1.</strong> Las Partes reconocen expresamente que el Servicio consiste en la colocación,
          supervisión, reemplazo y soporte del Closer, y constituye una{" "}
          <strong>obligación de medios y no de resultados</strong>.
        </p>
        <p className="mt-2">
          <strong>5.2.</strong> Closwork <strong>NO garantiza</strong> un volumen, número, monto ni tasa de
          conversión determinados de ventas, ni un número determinado de citas, llamadas o propuestas. Cualquier
          proyección, ejemplo o resultado histórico compartido por Closwork es meramente ilustrativo y no
          constituye promesa ni garantía de rendimiento.
        </p>
        <p className="mt-2">
          <strong>5.3.</strong> Closwork no es patrón, empleador, socio ni representante legal del Closer, ni
          percibe comisión alguna sobre las ventas del Cliente, ni interviene en el margen del Cliente.
        </p>
        <p className="mt-2">
          <strong>5.4.</strong> El resultado comercial depende de factores fuera del control de Closwork,
          incluyendo —de manera enunciativa— la calidad y volumen de los leads del Cliente, su oferta, precio,
          capacidad de entrega, materiales de venta y velocidad de respuesta.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">6. GARANTÍA DE ARRANQUE</h3>
        <p>
          <strong>6.1.</strong> Closwork se obliga a colocar al primer Closer dentro de los{" "}
          <strong>30 (treinta) días hábiles</strong> siguientes al Onboarding Completo.
        </p>
        <p className="mt-2">
          <strong>6.2.</strong> Si Closwork no realiza dicha Colocación dentro de ese plazo por causas
          imputables a Closwork, el Cliente podrá optar, mediante aviso por escrito, entre:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-2">
          <li>Otorgar a Closwork una prórroga de 15 (quince) días hábiles adicionales; o</li>
          <li>
            <strong>
              Cancelar el Servicio con devolución íntegra de la totalidad de las cuotas mensuales efectivamente
              cobradas
            </strong>{" "}
            desde la contratación y hasta la fecha de cancelación (y, en su caso, de la Cuota de Implementación
            de la Cláusula 8.2), sin penalización alguna para ninguna de las Partes.
          </li>
        </ol>
        <p className="mt-2">
          <strong>6.3.</strong> Esta garantía <strong>no aplica</strong> cuando la demora derive de: (i) falta
          de entrega del Formulario de Onboarding, accesos o materiales por parte del Cliente; (ii) rechazo por
          el Cliente de los candidatos presentados por Closwork, habiéndose presentado al menos dos (2)
          perfiles; o (iii) caso fortuito o fuerza mayor.
        </p>
        <p className="mt-2">
          <strong>6.4.</strong> La devolución prevista en la Cláusula 6.2(b) constituye el único supuesto de
          reembolso contemplado en estos Términos, y es el remedio único y exclusivo del Cliente por la falta de
          Colocación oportuna.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">7. GARANTÍA DE REEMPLAZO</h3>
        <p>
          <strong>7.1. Supuestos.</strong> Closwork reemplazará al Closer colocado,{" "}
          <strong>sin costo adicional</strong>, cuando:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-2">
          <li>
            El Closer no encaje con la oferta u operación del Cliente; <strong>o</strong>
          </li>
          <li>
            El Closer cese su colaboración con el Cliente por cualquier causa (renuncia, incapacidad, abandono,
            incumplimiento o baja del programa de Closwork).
          </li>
        </ol>
        <p className="mt-2">
          La solicitud del Cliente en el supuesto (a) deberá hacerse por escrito al correo señalado en la
          Cláusula 18, exponiendo los motivos.
        </p>
        <p className="mt-2">
          <strong>7.2. Condiciones de procedencia.</strong> La garantía aplica siempre que, de manera
          acumulativa:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-2">
          <li>El Cliente se encuentre al corriente en sus pagos;</li>
          <li>
            El Cliente haya cumplido con sus obligaciones de la Cláusula 10 (entrega de leads en el volumen
            comprometido en el Formulario de Onboarding, materiales, accesos y retroalimentación);
          </li>
          <li>
            El Cliente haya participado en al menos 2 (dos) de las últimas 3 (tres) sesiones semanales de
            supervisión; y
          </li>
          <li>
            Tratándose del supuesto 7.1(a), el Closer haya acumulado al menos 15 (quince) días hábiles activos
            con el Cliente.
          </li>
        </ol>
        <p className="mt-2">Las condiciones (c) y (d) no serán exigibles en el supuesto 7.1(b).</p>
        <p className="mt-2">
          <strong>7.3. Plazos.</strong> Closwork iniciará el proceso de match del nuevo Closer dentro de los{" "}
          <strong>7 (siete) días hábiles</strong> siguientes a la solicitud o a la baja del Closer, y buscará
          colocarlo dentro de los <strong>15 (quince) días hábiles</strong> siguientes, sujeto a disponibilidad
          de perfiles compatibles.
        </p>
        <p className="mt-2">
          <strong>7.4. Límite.</strong> El Cliente tendrá derecho a un máximo de{" "}
          <strong>2 (dos) reemplazos por cada 3 (tres) meses</strong> de vigencia de la Suscripción. Los
          reemplazos adicionales quedarán sujetos a disponibilidad y podrán generar contraprestación
          adicional.
        </p>
        <p className="mt-2">
          <strong>7.5. Alcance.</strong> La garantía no cubre la falta de resultados de venta por sí sola, ni
          situaciones atribuibles al incumplimiento del Cliente. El reemplazo no suspende, no prorroga, no
          bonifica la Suscripción ni genera derecho a devolución.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">8. PRECIO, FACTURACIÓN Y FORMA DE PAGO</h3>
        <p>
          <strong>8.1. Cuota mensual.</strong> El Cliente pagará una cuota fija mensual de{" "}
          <strong>
            $249.00 USD (doscientos cuarenta y nueve dólares estadounidenses 00/100 M.E.), más el Impuesto al
            Valor Agregado correspondiente
          </strong>
          , con independencia del número o monto de ventas cerradas. Al tratarse de un precio expresado en
          dólares estadounidenses, el importe cobrado en moneda local podrá variar según el tipo de cambio del
          día en que se realice el cargo.
        </p>
        <p className="mt-2">
          <strong>8.2. Cuota única de implementación.</strong> Al inicio del Servicio, el Cliente pagará por
          única vez una <strong>Cuota de Implementación de $249.00 USD más I.V.A.</strong>, correspondiente al
          diagnóstico inicial, el proceso de match y la inducción del primer Closer. Esta cuota no es
          reembolsable, salvo en el supuesto de la Cláusula 6.2(b).
        </p>
        <p className="mt-2">
          <strong>8.3. Closers adicionales.</strong> El Cliente podrá solicitar la colocación de Closers
          adicionales conforme a la siguiente tabla:
        </p>
        <div className="overflow-x-auto mt-2">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4 font-semibold">Concepto</th>
                <th className="py-2 font-semibold">Precio mensual (más I.V.A.)</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b">
                <td className="py-2 pr-4">Plan Concierge — incluye 1 (un) Closer</td>
                <td className="py-2">
                  <strong>$249.00 USD</strong>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4">Cada Closer adicional (hasta 3 adicionales)</td>
                <td className="py-2">
                  <strong>$199.00 USD</strong>
                </td>
              </tr>
              <tr>
                <td className="py-2 pr-4">A partir del 5.º Closer</td>
                <td className="py-2">Sujeto a cotización específica y acuerdo por escrito</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          Cada Closer adicional queda sujeto íntegramente a estos Términos, incluyendo las garantías de las
          Cláusulas 6 y 7 y la Cláusula 11 (No Elusión), y se factura desde el mes de su colocación.
        </p>
        <p className="mt-2">
          <strong>8.4. Cobro recurrente.</strong> El pago se realiza mediante Stripe. Al aceptar estos Términos,
          el Cliente autoriza a Closwork a realizar cargos automáticos recurrentes al método de pago registrado,
          cada periodo mensual, hasta que la Suscripción sea cancelada conforme a la Cláusula 12.
        </p>
        <p className="mt-2">
          <strong>8.5. Fecha de cargo.</strong> El primer cargo (cuota mensual más Cuota de Implementación) se
          realiza al momento de la contratación. Los cargos subsecuentes se realizarán en la misma fecha de cada
          mes calendario (o el último día del mes cuando no exista fecha equivalente).
        </p>
        <p className="mt-2">
          <strong>8.6. Moneda y variaciones.</strong> Los precios están expresados en dólares estadounidenses.
          Cualquier diferencia cambiaria, comisión bancaria, cargo por conversión de divisa o cargo de la
          institución emisora del Cliente será a cargo exclusivo del Cliente.
        </p>
        <p className="mt-2">
          <strong>8.7. Impuestos y CFDI.</strong> Cada Parte es responsable de los impuestos que le
          correspondan. Closwork emitirá el CFDI correspondiente conforme a las disposiciones fiscales
          vigentes, con base en los Datos de Contratación proporcionados por el Cliente. Es responsabilidad
          exclusiva del Cliente proporcionar datos fiscales correctos; Closwork no será responsable por CFDI que
          no puedan emitirse o deban cancelarse por datos erróneos.
        </p>
        <p className="mt-2">
          <strong>8.8. Falta de pago.</strong> Si un cargo es rechazado o no se acredita el pago, Closwork podrá
          suspender el Servicio —incluyendo el acceso al Closer y la supervisión— previa notificación por
          correo electrónico, y rescindir el contrato si la falta de pago persiste por más de 10 (diez) días
          naturales.
        </p>
        <p className="mt-2">
          <strong>8.9. Devoluciones.</strong> Salvo lo previsto en la Cláusula 6.2(b) y salvo disposición legal
          en contrario, las cuotas pagadas <strong>no son reembolsables</strong>, incluyendo el caso de
          cancelación a mitad de un periodo ya facturado. La cancelación surte efectos al final del periodo
          pagado, durante el cual el Cliente conserva el Servicio.
        </p>
        <p className="mt-2">
          <strong>8.10. Cambios de precio.</strong> Closwork podrá modificar el precio notificando al Cliente con
          al menos 30 (treinta) días naturales de anticipación al correo registrado. Si el Cliente no cancela
          antes de la siguiente fecha de cobro, se entenderá que acepta el nuevo precio.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">9. COMISIONES DEL CLOSER</h3>
        <p>
          <strong>9.1.</strong> La Comisión del Closer es definida, negociada y pagada{" "}
          <strong>directa e íntegramente por el Cliente al Closer</strong>. Su monto, forma de cálculo y momento
          de pago se hacen constar en el Formulario de Onboarding.
        </p>
        <p className="mt-2">
          <strong>9.2.</strong> Closwork no funge como intermediario, retenedor, administrador ni garante de
          dichas comisiones, ni asume responsabilidad alguna por su cálculo, retención, entero de impuestos o
          pago.
        </p>
        <p className="mt-2">
          <strong>9.3.</strong> Cualquier controversia entre el Cliente y el Closer respecto de comisiones,
          pagos, cumplimiento o conducta se resolverá exclusivamente entre ellos. Closwork podrá, sin
          obligación, facilitar la comunicación entre las Partes.
        </p>
        <p className="mt-2">
          <strong>9.4.</strong> El Cliente se obliga a pagar puntualmente al Closer la Comisión pactada. El
          incumplimiento reiterado de esta obligación faculta a Closwork a retirar al Closer y a rescindir el
          contrato sin responsabilidad ni devolución.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">10. OBLIGACIONES DEL CLIENTE</h3>
        <p>
          <strong>10.1.</strong> El Cliente se obliga a:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-2">
          <li>Pagar la contraprestación en tiempo y forma y mantener vigente un método de pago válido.</li>
          <li>
            Entregar el Formulario de Onboarding completo dentro de los 5 (cinco) días hábiles siguientes a la
            contratación.
          </li>
          <li>
            Proporcionar los insumos necesarios para la prestación del Servicio: leads —en el volumen y
            periodicidad comprometidos en el Formulario de Onboarding—, materiales de venta, información de
            producto y precios, accesos a las herramientas requeridas (CRM, marcador, agenda, etc.) y cualquier
            otra información razonablemente solicitada.
          </li>
          <li>Definir y pagar directamente la Comisión del Closer.</li>
          <li>
            Participar en las sesiones semanales de supervisión y dar retroalimentación oportuna sobre el
            desempeño del Closer.
          </li>
          <li>
            Permitir y facilitar la grabación y el monitoreo de las llamadas del Closer, en términos de la
            Cláusula 15.
          </li>
          <li>
            Cumplir con la legislación aplicable a su propia actividad comercial, incluyendo la relativa a
            publicidad, protección al consumidor y datos personales de sus prospectos y clientes.
          </li>
          <li>
            No solicitar ni instruir al Closer a realizar prácticas engañosas, ilegales o contrarias a la ética
            comercial.
          </li>
          <li>
            Abstenerse de exigir al Closer sujeción, dirección o subordinación de naturaleza laboral (ver
            Cláusula 14).
          </li>
        </ol>
        <p className="mt-2">
          <strong>10.2. Incumplimiento del Cliente.</strong> El incumplimiento de las obligaciones anteriores
          libera a Closwork de responsabilidad por la falta de prestación o degradación del Servicio, suspende
          los plazos y garantías a cargo de Closwork, y no genera derecho a devolución ni bonificación.
        </p>
        <p className="mt-2">
          <strong>10.3. Ausencia de leads.</strong> Si el Cliente deja de entregar leads, la Suscripción
          continúa vigente y se sigue cobrando. El Servicio no admite pausas, suspensiones ni congelamientos por
          inactividad comercial del Cliente.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">11. NO ELUSIÓN Y COLOCACIÓN DIRECTA</h3>
        <p>
          <strong>11.1. Reconocimiento.</strong> El Cliente reconoce que el Closer le fue presentado
          exclusivamente como consecuencia del Servicio y de la inversión de Closwork en reclutamiento,
          certificación, capacitación y validación de perfiles, y que dicha presentación tiene un valor
          económico propio, independiente de la cuota mensual.
        </p>
        <p className="mt-2">
          <strong>11.2. Obligación.</strong> Durante la vigencia del contrato y por un plazo de{" "}
          <strong>12 (doce) meses</strong> posteriores a su terminación, el Cliente se obliga a no contratar,
          emplear, retener ni continuar relación comercial alguna con cualquier Closer presentado por Closwork
          —directamente o a través de terceros, filiales, sociedades relacionadas, personas interpósitas o
          cualquier otra estructura— una vez cancelada o terminada la Suscripción, salvo que se pague la Cuota
          de Colocación Directa prevista en la Cláusula 11.3.
        </p>
        <p className="mt-2">
          <strong>11.3. Cuota de Colocación Directa.</strong> Si el Cliente desea conservar al Closer una vez
          terminada la Suscripción, podrá hacerlo pagando a Closwork, por única vez y por cada Closer, una{" "}
          <strong>Cuota de Colocación Directa de $2,500.00 USD más I.V.A.</strong>, que constituye la
          contraprestación por el servicio de reclutamiento, certificación y colocación permanente de dicho
          profesional.
        </p>
        <p className="mt-2">
          <strong>11.4. Incumplimiento.</strong> Si el Cliente retiene al Closer sin cubrir la Cuota de
          Colocación Directa, se obliga a pagarla íntegramente más un 50 % (cincuenta por ciento) por concepto
          de pena convencional, sin perjuicio de las acciones legales que correspondan.
        </p>
        <p className="mt-2">
          <strong>11.5. Alcance.</strong> Esta cláusula no limita el derecho del Closer a trabajar libremente;
          regula únicamente la conducta del Cliente frente a Closwork y el pago de una contraprestación por un
          servicio efectivamente recibido.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">12. VIGENCIA, RENOVACIÓN Y CANCELACIÓN</h3>
        <p>
          <strong>12.1. Vigencia.</strong> Indefinida, con renovación automática por periodos mensuales
          sucesivos, mientras el Cliente no cancele.
        </p>
        <p className="mt-2">
          <strong>12.2. Cancelación por el Cliente.</strong> El Cliente podrá cancelar en cualquier momento
          mediante aviso por escrito al correo electrónico de la Cláusula 18, con al menos 5 (cinco) días
          naturales de anticipación a la siguiente fecha de cobro. La cancelación surte efectos al final del
          periodo en curso ya pagado.
        </p>
        <p className="mt-2">
          <strong>12.3. Terminación por Closwork.</strong> Closwork podrá dar por terminado el contrato sin
          responsabilidad, mediante aviso con 15 (quince) días naturales de anticipación.
        </p>
        <p className="mt-2">
          <strong>12.4. Rescisión inmediata.</strong> Closwork podrá rescindir de inmediato, sin
          responsabilidad ni devolución, si el Cliente: (i) incurre en falta de pago conforme a la Cláusula 8.8;
          (ii) incumple reiteradamente el pago de la Comisión del Closer; (iii) instruye al Closer a realizar
          prácticas engañosas o ilegales; (iv) impide la grabación o supervisión de llamadas; o (v) incumple la
          Cláusula 11.
        </p>
        <p className="mt-2">
          <strong>12.5. Efectos de la terminación.</strong> Al terminar el contrato cesan la supervisión, el
          soporte y las garantías de las Cláusulas 6 y 7. Subsisten las obligaciones de confidencialidad
          (Cláusula 13), la no elusión (Cláusula 11), las indemnidades pactadas y cualquier adeudo pendiente.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">13. CONFIDENCIALIDAD</h3>
        <p>
          <strong>13.1. Definición.</strong> Se considera Información Confidencial toda información, dato,
          documento, conocimiento técnico, plan, estrategia, diseño, secreto comercial, base de leads,
          propiedad intelectual, precio o metodología que una Parte revele a la otra —de forma verbal, escrita,
          electrónica o de cualquier otra forma— que esté marcada como confidencial o que razonablemente deba
          considerarse como tal.
        </p>
        <p className="mt-2">
          <strong>13.2. Obligación recíproca.</strong> Cada Parte se obliga a no divulgar, copiar, reproducir,
          distribuir ni hacer accesible la Información Confidencial de la otra a terceros sin consentimiento
          previo y por escrito, ni a usarla para fin distinto al cumplimiento de estos Términos. Se exceptúa la
          divulgación requerida por autoridad competente y aquélla necesaria para prestar el Servicio
          (incluyendo la compartición con el Closer asignado, quien está sujeto a obligaciones de
          confidencialidad equivalentes).
        </p>
        <p className="mt-2">
          <strong>13.3. Excepciones.</strong> No se considera Información Confidencial aquélla que: (i) sea o
          llegue a ser de dominio público sin culpa de la Parte receptora; (ii) ya obrara legítimamente en poder
          de la Parte receptora; o (iii) sea desarrollada de forma independiente sin uso de la Información
          Confidencial.
        </p>
        <p className="mt-2">
          <strong>13.4. Vigencia.</strong> Esta obligación subsiste por 10 (diez) años contados a partir de la
          terminación del contrato, cualquiera que sea su causa.
        </p>
        <p className="mt-2">
          <strong>13.5. Pena convencional.</strong> La divulgación de Información Confidencial con dolo o mala
          fe, en beneficio propio o de terceros, dará derecho a la Parte afectada al pago de una pena
          convencional de{" "}
          <strong>$150,000.00 MXN (ciento cincuenta mil pesos 00/100 M.N.)</strong>, pagadera dentro de los 5
          (cinco) días hábiles siguientes al requerimiento, sin perjuicio de las acciones civiles y penales
          previstas en la Ley Federal de Protección a la Propiedad Industrial y demás legislación aplicable.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">14. AUSENCIA DE RELACIÓN LABORAL</h3>
        <p>
          <strong>14.1.</strong> Estos Términos constituyen un contrato de prestación de servicios de naturaleza
          mercantil. Las Partes reconocen que no se actualizan los supuestos de los artículos 10 y 13 de la Ley
          Federal del Trabajo, ya que Closwork no queda sujeto a dirección, dependencia ni subordinación del
          Cliente.
        </p>
        <p className="mt-2">
          <strong>14.2.</strong> No se crea relación laboral, asociación, sociedad, coinversión, franquicia ni
          agencia entre las Partes, ni entre Closwork y el personal de cada una.
        </p>
        <p className="mt-2">
          <strong>14.3.</strong> El Closer es un profesional independiente. Cualquier relación —de la naturaleza
          que sea— que se genere entre el Cliente y el Closer es responsabilidad exclusiva del Cliente, quien se
          obliga a sacar en paz y a salvo e indemnizar a Closwork de cualquier reclamación laboral, de seguridad
          social, fiscal o administrativa que el Closer o cualquier autoridad presente en contra de Closwork con
          motivo de dicha relación.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">15. GRABACIÓN Y MONITOREO DE LLAMADAS</h3>
        <p>
          <strong>15.1. Consentimiento.</strong> El Cliente autoriza expresamente a Closwork a grabar, escuchar,
          auditar y analizar las llamadas y videollamadas sostenidas por el Closer en el marco del Servicio, con
          la finalidad de supervisar el desempeño, retroalimentar al Closer y mejorar el proceso de cierre. Sin
          esta autorización, el Servicio no puede prestarse.
        </p>
        <p className="mt-2">
          <strong>15.2. Base legal frente a terceros.</strong> El Cliente declara y garantiza que cuenta con la
          base legal y los consentimientos necesarios, conforme a la Ley Federal de Protección de Datos
          Personales en Posesión de los Particulares y su Reglamento, para que sus prospectos y clientes sean
          contactados y sus llamadas grabadas y tratadas por el Closer y por Closwork. El Cliente es el{" "}
          <strong>responsable</strong> del tratamiento de dichos datos; Closwork actúa como{" "}
          <strong>encargado</strong>, únicamente conforme a las instrucciones del Cliente y para los fines del
          Servicio.
        </p>
        <p className="mt-2">
          <strong>15.3. Indemnidad.</strong> El Cliente se obliga a sacar en paz y a salvo e indemnizar a
          Closwork de cualquier reclamación, procedimiento, multa o sanción —de titulares de datos, del INAI o
          de cualquier autoridad— derivada de la falta de base legal, aviso de privacidad o consentimiento
          respecto de los datos personales que el Cliente puso a disposición del Closer o de Closwork.
        </p>
        <p className="mt-2">
          <strong>15.4. Uso de la información.</strong> Closwork podrá utilizar las grabaciones y las métricas
          de actividad de forma <strong>agregada, disociada y anonimizada</strong> para fines de mejora de su
          metodología, entrenamiento de sus Closers y elaboración de estadísticas de industria, sin identificar
          en ningún caso al Cliente, a sus prospectos ni a sus clientes.
        </p>
        <p className="mt-2">
          <strong>15.5. Negativa.</strong> La negativa del Cliente a permitir la grabación o el monitoreo
          constituye un incumplimiento sustancial que libera a Closwork de las garantías de las Cláusulas 6 y 7
          y faculta la rescisión conforme a la Cláusula 12.4.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">16. PROPIEDAD INTELECTUAL Y DATOS PERSONALES</h3>
        <p>
          <strong>16.1.</strong> Cada Parte conserva la titularidad de su propia propiedad intelectual, marcas,
          materiales y metodologías preexistentes. Nada en estos Términos transfiere derecho de propiedad
          alguno.
        </p>
        <p className="mt-2">
          <strong>16.2.</strong> Los materiales de venta, guiones y bases de leads aportados por el Cliente son
          y seguirán siendo propiedad del Cliente. Las metodologías, procesos de certificación, scorecards,
          formularios, bitácoras y herramientas de supervisión de Closwork son y seguirán siendo propiedad
          exclusiva de Closwork, y no podrán ser reproducidos, replicados ni utilizados por el Cliente fuera del
          Servicio.
        </p>
        <p className="mt-2">
          <strong>16.3. Datos personales.</strong> Cada Parte es responsable del tratamiento de los datos
          personales que recabe, en términos de la Ley Federal de Protección de Datos Personales en Posesión de
          los Particulares, y conforme a lo pactado en la Cláusula 15. El Aviso de Privacidad de Closwork está
          disponible en{" "}
          <a href="/privacidad" className="text-primary underline underline-offset-2">
            /privacidad
          </a>
          .
        </p>
        <p className="mt-2">
          <strong>16.4. Referencias comerciales.</strong> Closwork podrá usar el nombre y logotipo del Cliente
          como referencia comercial. El Cliente puede revocar esta autorización en cualquier momento por
          escrito.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">17. LIMITACIÓN DE RESPONSABILIDAD</h3>
        <p>
          <strong>17.1.</strong> En la máxima medida permitida por la ley, la responsabilidad total y acumulada
          de Closwork frente al Cliente por cualquier concepto derivado de estos Términos no excederá el monto
          total efectivamente pagado por el Cliente a Closwork durante los 3 (tres) meses inmediatos anteriores
          al hecho que dio origen a la reclamación.
        </p>
        <p className="mt-2">
          <strong>17.2.</strong> Closwork no será responsable por lucro cesante, pérdida de oportunidades,
          daños indirectos, incidentales o consecuenciales, ni por los actos u omisiones del Closer frente al
          Cliente o frente a terceros.
        </p>
        <p className="mt-2">
          <strong>17.3.</strong> Ninguna limitación de esta cláusula aplica en casos de dolo o mala fe.
        </p>
        <p className="mt-2">
          <strong>17.4. Caso fortuito y fuerza mayor.</strong> Ninguna Parte será responsable por
          incumplimientos derivados de caso fortuito o fuerza mayor, incluyendo fallas generalizadas de
          telecomunicaciones o plataformas de terceros.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">18. NOTIFICACIONES</h3>
        <p>Todas las notificaciones deberán constar por escrito y enviarse a:</p>
        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
          <li>
            <strong>CLOSWORK</strong> — Correo: kevin@closwork.com · Tel.: +52 33 3598 5436 · Domicilio: Tepic,
            Nayarit, México
          </li>
          <li>
            <strong>EL CLIENTE</strong> — El correo electrónico y domicilio proporcionados en los Datos de
            Contratación
          </li>
        </ul>
        <p className="mt-2">
          Las Partes acuerdan que el correo electrónico es un medio oficial y válido de notificación. Se
          entenderá recibida la notificación el día hábil siguiente a su envío. Es obligación de cada Parte
          mantener actualizados sus datos de contacto.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">19. MODIFICACIONES A ESTOS TÉRMINOS</h3>
        <p>
          <strong>19.1.</strong> Closwork podrá modificar estos Términos. Los cambios se notificarán al correo
          registrado del Cliente con al menos 30 (treinta) días naturales de anticipación y se publicarán en{" "}
          <a href="/tyc-concierge" className="text-primary underline underline-offset-2">
            /tyc-concierge
          </a>
          .
        </p>
        <p className="mt-2">
          <strong>19.2.</strong> La continuación del uso del Servicio o el pago del siguiente periodo
          posterior a la entrada en vigor de los cambios constituye aceptación de los Términos modificados. Si
          el Cliente no está de acuerdo, su único recurso es cancelar la Suscripción antes de la siguiente
          fecha de cobro.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">20. MISCELÁNEOS</h3>
        <p>
          <strong>20.1. Cesión.</strong> Ninguna Parte podrá ceder sus derechos u obligaciones sin
          consentimiento previo y por escrito de la otra, salvo que Closwork ceda el contrato a una sociedad de
          la que sea socio o accionista, o como parte de una reestructura o venta de su negocio, en cuyo caso
          bastará el aviso al Cliente.
        </p>
        <p className="mt-2">
          <strong>20.2. Acuerdo total.</strong> Estos Términos, junto con los Datos de Contratación y el
          Formulario de Onboarding, constituyen el acuerdo total entre las Partes y sustituyen cualquier
          acuerdo previo, verbal o escrito, sobre la misma materia.
        </p>
        <p className="mt-2">
          <strong>20.3. Divisibilidad.</strong> Si alguna disposición se declara inválida, el resto permanecerá
          vigente, interpretándose en lo posible conforme a la voluntad original de las Partes.
        </p>
        <p className="mt-2">
          <strong>20.4. Renuncia.</strong> La falta o demora en el ejercicio de un derecho no implica renuncia
          al mismo ni a derechos futuros.
        </p>
        <p className="mt-2">
          <strong>20.5. Encabezados.</strong> Los encabezados son sólo de referencia y no definen ni limitan el
          contenido de las cláusulas.
        </p>
        <p className="mt-2">
          <strong>20.6. Ausencia de vicios del consentimiento.</strong> Las Partes declaran que los términos
          pactados son justos y legítimos, y que no existe dolo, error, lesión, enriquecimiento ilegítimo ni
          cualquier otro vicio del consentimiento.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">21. LEY APLICABLE Y JURISDICCIÓN</h3>
        <p>
          <strong>21.1.</strong> Estos Términos se rigen e interpretan conforme al Código de Comercio y demás
          legislación federal mexicana aplicable.
        </p>
        <p className="mt-2">
          <strong>21.2.</strong> Para todo lo relativo a su interpretación y cumplimiento, las Partes se
          someten expresamente a la jurisdicción y competencia de los tribunales del fuero común del municipio
          de <strong>Tepic, Nayarit</strong>, renunciando de manera expresa e irrevocable a cualquier otro fuero
          que pudiera corresponderles por razón de sus domicilios presentes o futuros o por cualquier otro
          motivo.
        </p>
      </div>

      <div className="rounded-md border p-4">
        <h3 className="font-semibold text-base mb-2">CONSTANCIA DE ACEPTACIÓN</h3>
        <p>
          Este documento no requiere firma autógrafa. La aceptación se acredita con el registro electrónico
          generado por Stripe al momento del pago, que incluye la identidad del Cliente, los Datos de
          Contratación, la fecha y hora de aceptación, la versión de estos Términos y el identificador de la
          transacción.
        </p>
      </div>
    </div>
  );
};

export default ConciergeTyCContent;
