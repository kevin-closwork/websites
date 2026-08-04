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
          <strong>Versión 3.0</strong> · Última actualización: 4 de agosto de 2026
        </p>
        <p className="mt-2 text-muted-foreground italic">
          Esta versión sustituye íntegramente a la Versión 2.0 del 14 de julio de 2026. Los cambios principales
          se encuentran en las Cláusulas 3, 6, 7 y 8 (alcance de supervisión, garantías y estructura de precio).
          Todos los montos de estos Términos están expresados en dólares estadounidenses y con el Impuesto al
          Valor Agregado incluido.
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
                <td className="py-2 pr-4 font-medium">Cuota de Implementación</td>
                <td className="py-2">
                  El pago único de $999.00 USD previsto en la Cláusula 8.1, correspondiente al diagnóstico
                  inicial, el proceso de match y la inducción del primer Closer.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Cuota Mensual</td>
                <td className="py-2">
                  El pago recurrente mensual de $60.00 USD previsto en la Cláusula 8.1, que da acceso
                  continuado al Servicio, a la supervisión y a las garantías de las Cláusulas 6 y 7.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">MSI</td>
                <td className="py-2">
                  Meses sin intereses: facilidad de diferimiento ofrecida por la institución financiera emisora
                  de la tarjeta de crédito del Cliente, en los términos de la Cláusula 8.6.
                </td>
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
                  información indispensable para prestarlo (oferta, ticket, ciclo de venta, volumen y fuente de
                  leads, comisión del Closer, herramientas, materiales y reglas de operación). Es un requisito
                  indispensable: los plazos a cargo de Closwork no comienzan a correr hasta que el Cliente lo
                  entrega completo.
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
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Volumen Comprometido de Leads</td>
                <td className="py-2">
                  El número y periodicidad de leads calificados que el Cliente declara en el Formulario de
                  Onboarding y se obliga a poner a disposición del Closer.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Periodo de Encaje</td>
                <td className="py-2">
                  Los 14 (catorce) días naturales siguientes al inicio de actividades de un Closer, durante los
                  cuales aplica lo previsto en la Cláusula 7.3.
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Estándares de Desempeño</td>
                <td className="py-2">
                  Los criterios objetivos y medibles listados en la Cláusula 7.2, cuyo incumplimiento por el
                  Closer da lugar a su reemplazo.
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
          <li>Correo electrónico y teléfono de contacto;</li>
          <li>Plazo de MSI seleccionado, en su caso.</li>
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
                  <strong>Supervisión y auditoría de llamadas</strong> del Closer, con ajustes orientados a
                  mejorar el proceso de cierre.
                </td>
                <td className="py-2">
                  Una (1) sesión mensual de revisión de hasta 45 minutos, más la auditoría de hasta cuatro (4)
                  llamadas grabadas al mes, con retroalimentación al Closer.
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
                  <strong>Actualización de guion y manejo de objeciones.</strong>
                </td>
                <td className="py-2">Una (1) revisión trimestral, sobre los materiales aportados por el Cliente.</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-3">g)</td>
                <td className="py-2 pr-3">
                  <strong>Garantía de arranque</strong> en los términos de la Cláusula 6.
                </td>
                <td className="py-2">—</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 pr-3">h)</td>
                <td className="py-2 pr-3">
                  <strong>Rotación de personal</strong> en los términos de la Cláusula 7.
                </td>
                <td className="py-2">—</td>
              </tr>
              <tr>
                <td className="py-2 pr-3">i)</td>
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
        <p className="mt-2">
          <strong>3.5. Vinculación del Servicio a la Cuota Mensual.</strong> El Servicio, en todos sus
          componentes —incluyendo la supervisión, la auditoría de llamadas, el soporte y las garantías de las
          Cláusulas 6 y 7—, está indisolublemente vinculado al pago puntual de la Cuota Mensual. La Cuota de
          Implementación no otorga, por sí sola, derecho a la permanencia del Closer ni a ninguno de los
          servicios recurrentes. No existe modalidad de contratación que comprenda únicamente la Cuota de
          Implementación.
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
          supervisión, rotación y soporte del Closer, y constituye una{" "}
          <strong>obligación de medios y no de resultados</strong>.
        </p>
        <p className="mt-2">
          <strong>5.2.</strong> Closwork <strong>NO garantiza</strong> un volumen, número, monto ni tasa de
          conversión determinados de ventas, ni un número determinado de citas, llamadas o propuestas, ni un
          tiempo determinado hasta el primer cierre. Cualquier proyección, ejemplo o resultado histórico
          compartido por Closwork es meramente ilustrativo y no constituye promesa ni garantía de rendimiento.
        </p>
        <p className="mt-2">
          <strong>5.3.</strong> Closwork no es patrón, empleador, socio ni representante legal del Closer, ni
          percibe comisión alguna sobre las ventas del Cliente, ni interviene en el margen del Cliente. La
          totalidad de las contraprestaciones a favor de Closwork son cuotas fijas, independientes del
          desempeño comercial del Cliente.
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
              Cancelar el Servicio con devolución del 100 % (cien por ciento) de las cantidades efectivamente
              pagadas a Closwork
            </strong>
            , comprendiendo la Cuota de Implementación y la totalidad de las Cuotas Mensuales cobradas desde la
            contratación y hasta la fecha de cancelación, sin deducción por gastos incurridos y sin penalización
            alguna para ninguna de las Partes.
          </li>
        </ol>
        <p className="mt-2">
          <strong>6.3.</strong> Esta garantía <strong>no aplica</strong> cuando la demora derive de: (i) falta
          de entrega oportuna y completa del Formulario de Onboarding, accesos o materiales por parte del
          Cliente; (ii) rechazo por el Cliente de los candidatos presentados por Closwork, habiéndose presentado
          al menos dos (2) perfiles; o (iii) caso fortuito o fuerza mayor.
        </p>
        <p className="mt-2">
          <strong>6.4.</strong> La devolución prevista en la Cláusula 6.2(b) constituye el único supuesto de
          reembolso contemplado en estos Términos, y es el remedio único y exclusivo del Cliente por la falta de
          Colocación oportuna.
        </p>
        <p className="mt-2">
          <strong>6.5. Efecto del diferimiento a MSI.</strong> Cuando la Cuota de Implementación se haya cargado
          bajo la modalidad de MSI, la devolución prevista en la Cláusula 6.2(b) se realizará por el monto
          íntegro cargado, mediante reembolso a la misma tarjeta. El Cliente reconoce que la aplicación del
          reembolso frente a las mensualidades pendientes ante su institución emisora es un proceso ajeno a
          Closwork y sujeto a las políticas de dicha institución.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">7. ROTACIÓN DE PERSONAL</h3>
        <p>
          <strong>7.1. Alcance de la garantía.</strong> Mientras el Cliente mantenga vigente y al corriente su
          Cuota Mensual, Closwork reemplazará al Closer colocado,{" "}
          <strong>sin costo adicional y sin límite en el número de reemplazos</strong>, cuando se actualice
          cualquiera de los siguientes supuestos:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-2">
          <li>
            El Closer cese su colaboración con el Cliente por cualquier causa: renuncia, incapacidad, abandono,
            incumplimiento o baja del programa de Closwork; <strong>o</strong>
          </li>
          <li>
            El Closer incumpla cualquiera de los Estándares de Desempeño de la Cláusula 7.2, según se acredite
            en la auditoría de la Cláusula 3.1(d).
          </li>
        </ol>
        <p className="mt-2">
          La rotación es un componente del Servicio recurrente, no una indemnización ni una reclamación. Su
          procedencia deriva del cese o del incumplimiento del Closer, y no de un cambio en la estrategia, la
          oferta o las preferencias del Cliente.
        </p>
        <p className="mt-2">
          <strong>7.2. Estándares de Desempeño.</strong> Para los efectos de la Cláusula 7.1(b), se considerará
          que el Closer incumple cuando se actualice <strong>cualquiera</strong> de los siguientes supuestos,
          verificado en la auditoría mensual:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-2">
          <li>Falta a dos (2) o más llamadas agendadas dentro de un mismo mes, sin aviso previo;</li>
          <li>Tasa de asistencia a llamadas asignadas inferior al 80 % (ochenta por ciento) en el mes;</li>
          <li>
            Siete (7) días naturales consecutivos sin registrar actividad en el CRM o herramienta de seguimiento
            del Cliente;
          </li>
          <li>
            Calificación inferior a 6 (seis) sobre 10 (diez) en dos auditorías de llamada consecutivas,
            conforme al scorecard de Closwork; o
          </li>
          <li>
            Incumplimiento documentado del guion y de los criterios de calificación acordados durante la
            inducción.
          </li>
        </ol>
        <p className="mt-2">
          La verificación del incumplimiento corresponde a Closwork con base en la auditoría; no procede la
          determinación unilateral del Cliente.
        </p>
        <p className="mt-2">
          <strong>7.3. Periodo de Encaje.</strong> Adicionalmente a lo anterior, durante los 14 (catorce) días
          naturales siguientes al inicio de actividades de un Closer, el Cliente podrá solicitar su cambio{" "}
          <strong>sin expresión de causa</strong>, mediante aviso por escrito. Este derecho podrá ejercerse una
          (1) vez por cada Closer colocado, hasta un máximo de dos (2) veces por cada 12 (doce) meses de
          vigencia de la Suscripción.
        </p>
        <p className="mt-2">
          <strong>7.4. Cambios fuera de los supuestos anteriores.</strong> Transcurrido el Periodo de Encaje,
          la solicitud de cambio de Closer fundada exclusivamente en la apreciación subjetiva del Cliente —sin
          que se actualice ninguno de los supuestos de las Cláusulas 7.1(a) o 7.1(b)— quedará sujeta a
          disponibilidad de perfiles compatibles y podrá generar contraprestación adicional, previo acuerdo por
          escrito.
        </p>
        <p className="mt-2">
          <strong>7.5. Condiciones de procedencia.</strong> La rotación prevista en la Cláusula 7.1 aplica
          siempre que, de manera acumulativa:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-2">
          <li>El Cliente se encuentre al corriente en el pago de la Cuota Mensual;</li>
          <li>
            El Cliente haya cumplido con sus obligaciones de la Cláusula 10, incluyendo la entrega de
            materiales, accesos y retroalimentación;
          </li>
          <li>
            El volumen de leads efectivamente puesto a disposición del Closer durante los 60 (sesenta) días
            naturales previos a la solicitud sea de al menos el{" "}
            <strong>70 % (setenta por ciento)</strong> del Volumen Comprometido de Leads;
          </li>
          <li>
            La oferta, el precio del producto y el esquema de Comisión del Closer no hayan sido modificados por
            el Cliente sin aviso previo por escrito a Closwork; y
          </li>
          <li>
            El Cliente haya participado en al menos dos (2) de las últimas tres (3) sesiones mensuales de
            supervisión.
          </li>
        </ol>
        <p className="mt-2">
          El incumplimiento de cualquiera de estas condiciones suspende la garantía hasta que la condición se
          restablezca.
        </p>
        <p className="mt-2">
          <strong>7.6. Plazos.</strong> Closwork iniciará el proceso de match del nuevo Closer dentro de los{" "}
          <strong>7 (siete) días hábiles</strong> siguientes a la solicitud procedente o a la baja del Closer, y
          buscará colocarlo dentro de los <strong>15 (quince) días hábiles</strong> siguientes, sujeto a
          disponibilidad de perfiles compatibles.
        </p>
        <p className="mt-2">
          <strong>7.7. Revisión conjunta.</strong> A partir del tercer reemplazo dentro de un mismo periodo de
          12 (doce) meses, Closwork podrá condicionar la siguiente rotación a la celebración de una sesión de
          revisión conjunta de las condiciones declaradas en el Formulario de Onboarding. Esta revisión no
          constituye una negativa al reemplazo ni un límite al mismo; su finalidad es identificar y corregir
          causas estructurales antes de una nueva Colocación. Si de dicha revisión se desprende que alguna de
          las condiciones de la Cláusula 7.5 no se sostiene, aplicará la suspensión ahí prevista.
        </p>
        <p className="mt-2">
          <strong>7.8. Alcance.</strong> La rotación no cubre la falta de resultados de venta por sí sola, ni
          situaciones atribuibles al incumplimiento del Cliente. El reemplazo no suspende, no prorroga, no
          bonifica la Suscripción ni genera derecho a devolución. Durante el periodo comprendido entre la baja
          de un Closer y la Colocación del siguiente, la Cuota Mensual se sigue devengando y cobrando con
          normalidad.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">8. PRECIO, FACTURACIÓN Y FORMA DE PAGO</h3>
        <p>
          <strong>8.1. Precio.</strong> El precio del Plan Concierge es el siguiente, en ambos casos{" "}
          <strong>con el Impuesto al Valor Agregado incluido</strong>:
        </p>
        <div className="overflow-x-auto mt-3">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-2 pr-4 font-semibold">Concepto</th>
                <th className="py-2 pr-4 font-semibold">Monto</th>
                <th className="py-2 font-semibold">Periodicidad</th>
              </tr>
            </thead>
            <tbody className="align-top">
              <tr className="border-b">
                <td className="py-2 pr-4 font-medium">Cuota de Implementación</td>
                <td className="py-2 pr-4">
                  <strong>$999.00 USD</strong> (novecientos noventa y nueve dólares estadounidenses 00/100
                  M.E.)
                </td>
                <td className="py-2">Pago único</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 font-medium">Cuota Mensual</td>
                <td className="py-2 pr-4">
                  <strong>$60.00 USD</strong> (sesenta dólares estadounidenses 00/100 M.E.)
                </td>
                <td className="py-2">Mensual recurrente</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-2">
          <strong>8.2. Cuota de Implementación.</strong> Al inicio del Servicio, el Cliente pagará por única
          vez la Cuota de Implementación prevista en la Cláusula 8.1, correspondiente al diagnóstico inicial, el
          proceso de match y la inducción del primer Closer. Esta cuota no es reembolsable ni prorrateable, salvo
          en el supuesto de la Cláusula 6.2(b).
        </p>
        <p className="mt-2">
          <strong>8.3. Cuota Mensual.</strong> El Cliente pagará la Cuota Mensual prevista en la Cláusula 8.1,
          con I.V.A. incluido, <strong>con independencia del número o monto de ventas cerradas</strong> y con
          independencia de que el Cliente haga o no uso efectivo de las sesiones de supervisión. Al tratarse de
          precios expresados en dólares estadounidenses, el importe cobrado en moneda local podrá variar según
          el tipo de cambio del día en que se realice el cargo.
        </p>
        <p className="mt-2">
          <strong>8.4. Estabilidad de la Cuota Mensual.</strong> La Cuota Mensual contratada se mantendrá sin
          incremento mientras la Suscripción permanezca activa e ininterrumpida. Si la Suscripción se cancela y
          posteriormente se recontrata, aplicará el precio vigente en la fecha de la nueva contratación.
        </p>
        <p className="mt-2">
          <strong>8.5. Alcance del Plan.</strong> El Plan Concierge comprende la colocación, supervisión y
          rotación de un (1) Closer. La colocación de Closers adicionales no forma parte del Plan y quedará
          sujeta a cotización específica y acuerdo previo por escrito entre las Partes.
        </p>
        <p className="mt-2">
          <strong>8.6. Diferimiento a Meses Sin Intereses (MSI).</strong> La Cuota de Implementación podrá
          diferirse a mensualidades sin intereses cuando el Cliente pague con tarjeta de crédito elegible
          emitida en México y seleccione dicha opción en la pasarela de pago. El Cliente reconoce expresamente
          que:
        </p>
        <ol className="list-[lower-alpha] list-inside space-y-2 ml-2 mt-2">
          <li>
            El diferimiento es una facilidad otorgada por la institución financiera emisora de su tarjeta, no un
            crédito otorgado por Closwork;
          </li>
          <li>
            El cargo se aplica por el monto total en un solo evento, y es dicha institución quien difiere las
            mensualidades al Cliente;
          </li>
          <li>
            La obligación de pago de las mensualidades diferidas subsiste frente a la institución emisora aun
            en caso de cancelación de la Suscripción conforme a la Cláusula 12; y
          </li>
          <li>
            El diferimiento aplica exclusivamente a la Cuota de Implementación. La Cuota Mensual se cobra
            periodo a periodo y no es diferible.
          </li>
        </ol>
        <p className="mt-2">
          <strong>8.7. Improcedencia del financiamiento directo.</strong> Closwork no otorga financiamiento,
          crédito ni planes de pago propios sobre la Cuota de Implementación. Fuera de la modalidad de MSI
          prevista en la Cláusula 8.6, la única alternativa de pago admitida es 50 % (cincuenta por ciento) al
          momento de la contratación y 50 % (cincuenta por ciento) al momento de la Colocación del primer
          Closer.
        </p>
        <p className="mt-2">
          <strong>8.8. Cobro recurrente.</strong> El pago se realiza mediante Stripe. Al aceptar estos Términos,
          el Cliente autoriza a Closwork a realizar cargos automáticos recurrentes al método de pago registrado,
          cada periodo mensual, hasta que la Suscripción sea cancelada conforme a la Cláusula 12.
        </p>
        <p className="mt-2">
          <strong>8.9. Fecha de cargo.</strong> El primer cargo (Cuota de Implementación más la primera Cuota
          Mensual) se realiza al momento de la contratación. Los cargos subsecuentes de la Cuota Mensual se
          realizarán en la misma fecha de cada mes calendario (o el último día del mes cuando no exista fecha
          equivalente).
        </p>
        <p className="mt-2">
          <strong>8.10. Moneda única y precios finales.</strong> La totalidad de los precios, cuotas, penas
          convencionales y montos previstos en estos Términos están expresados en dólares estadounidenses (USD)
          y constituyen precios finales con I.V.A. incluido. Cualquier diferencia cambiaria, comisión bancaria,
          cargo por conversión de divisa o cargo de la institución emisora del Cliente será a cargo exclusivo
          del Cliente.
        </p>
        <p className="mt-2">
          <strong>8.11. Impuestos y CFDI.</strong> Todos los precios señalados en la Cláusula 8.1 y desplegados
          en la pasarela de pago <strong>incluyen el Impuesto al Valor Agregado</strong> aplicable. El Cliente
          no deberá cubrir cantidad adicional alguna por dicho concepto, y el monto que se cargue a su método de
          pago será exactamente el precio contratado. Tratándose de clientes con domicilio fiscal fuera de los
          Estados Unidos Mexicanos, el Servicio podrá considerarse exportación de servicios y quedar sujeto a
          la tasa del 0 % (cero por ciento) de I.V.A. conforme a la Ley del Impuesto al Valor Agregado, sin que
          ello modifique el precio pagado por el Cliente. Cada Parte es responsable de los demás impuestos que
          le correspondan. Closwork emitirá el CFDI correspondiente conforme a las disposiciones fiscales
          vigentes, con base en los Datos de Contratación proporcionados por el Cliente. Es responsabilidad
          exclusiva del Cliente proporcionar datos fiscales correctos; Closwork no será responsable por CFDI que
          no puedan emitirse o deban cancelarse por datos erróneos.
        </p>
        <p className="mt-2">
          <strong>8.12. Falta de pago.</strong> Si un cargo de la Cuota Mensual es rechazado o no se acredita el
          pago, Closwork podrá suspender el Servicio —incluyendo el retiro del Closer de la cuenta del Cliente,
          la supervisión y las garantías de las Cláusulas 6 y 7— previa notificación por correo electrónico, y
          rescindir el contrato si la falta de pago persiste por más de 10 (diez) días naturales. La suspensión
          por falta de pago no libera al Cliente de las obligaciones de la Cláusula 11 (No Elusión).
        </p>
        <p className="mt-2">
          <strong>8.13. Devoluciones.</strong> Salvo lo previsto en la Cláusula 6.2(b) y salvo disposición legal
          en contrario, las cuotas pagadas <strong>no son reembolsables</strong>, incluyendo el caso de
          cancelación a mitad de un periodo ya facturado. La cancelación surte efectos al final del periodo
          pagado, durante el cual el Cliente conserva el Servicio.
        </p>
        <p className="mt-2">
          <strong>8.14. Cambios de precio.</strong> Sin perjuicio de lo previsto en la Cláusula 8.4, Closwork
          podrá modificar el precio notificando al Cliente con al menos 30 (treinta) días naturales de
          anticipación al correo registrado. Si el Cliente no cancela antes de la siguiente fecha de cobro, se
          entenderá que acepta el nuevo precio.
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
          pago. Ninguna cantidad pagada por el Cliente a Closwork se calcula sobre las ventas del Cliente ni
          constituye participación en las mismas.
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
            contratación, incluyendo de manera veraz el Volumen Comprometido de Leads, el ticket promedio, el
            ciclo de venta y el esquema de Comisión del Closer.
          </li>
          <li>
            Proporcionar los insumos necesarios para la prestación del Servicio: leads —en el volumen y
            periodicidad comprometidos en el Formulario de Onboarding—, materiales de venta, información de
            producto y precios, accesos a las herramientas requeridas (CRM, marcador, agenda, etc.) y cualquier
            otra información razonablemente solicitada.
          </li>
          <li>Definir y pagar directamente la Comisión del Closer.</li>
          <li>
            Participar en las sesiones mensuales de supervisión y dar retroalimentación oportuna sobre el
            desempeño del Closer.
          </li>
          <li>
            Permitir y facilitar la grabación y el monitoreo de las llamadas del Closer, en términos de la
            Cláusula 15.
          </li>
          <li>
            Informar por escrito a Closwork, con al menos 10 (diez) días naturales de anticipación, cualquier
            modificación sustancial a su oferta, precio del producto o esquema de Comisión del Closer.
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
          <strong>10.2. Veracidad del Volumen Comprometido de Leads.</strong> El Cliente reconoce que el
          Volumen Comprometido de Leads declarado en el Formulario de Onboarding es un elemento determinante de
          la voluntad de Closwork para contratar y para otorgar las garantías de las Cláusulas 6 y 7. La
          declaración falsa o sustancialmente inexacta de dicho volumen faculta a Closwork a suspender las
          garantías conforme a la Cláusula 7.5(c).
        </p>
        <p className="mt-2">
          <strong>10.3. Incumplimiento del Cliente.</strong> El incumplimiento de las obligaciones anteriores
          libera a Closwork de responsabilidad por la falta de prestación o degradación del Servicio, suspende
          los plazos y garantías a cargo de Closwork, y no genera derecho a devolución ni bonificación.
        </p>
        <p className="mt-2">
          <strong>10.4. Ausencia de leads.</strong> Si el Cliente deja de entregar leads, la Suscripción
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
          económico propio, independiente de la Cuota Mensual y de la Cuota de Implementación.
        </p>
        <p className="mt-2">
          <strong>11.2. Obligación.</strong> Durante la vigencia del contrato y por un plazo de{" "}
          <strong>12 (doce) meses</strong> posteriores a su terminación, el Cliente se obliga a no contratar,
          emplear, retener ni continuar relación comercial alguna con cualquier Closer presentado por Closwork
          —directamente o a través de terceros, filiales, sociedades relacionadas, personas interpósitas o
          cualquier otra estructura— una vez cancelada, suspendida o terminada la Suscripción, salvo que se
          pague la Cuota de Colocación Directa prevista en la Cláusula 11.3.
        </p>
        <p className="mt-2">
          <strong>11.3. Cuota de Colocación Directa.</strong> Si el Cliente desea conservar al Closer una vez
          terminada o suspendida la Suscripción, podrá hacerlo pagando a Closwork, por única vez y por cada
          Closer, una <strong>Cuota de Colocación Directa de $2,500.00 USD, con I.V.A. incluido</strong>, que
          constituye la contraprestación por el servicio de reclutamiento, certificación y colocación permanente
          de dicho profesional.
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
          sucesivos, mientras el Cliente no cancele. No existe plazo forzoso ni penalización por cancelación.
        </p>
        <p className="mt-2">
          <strong>12.2. Cancelación por el Cliente.</strong> El Cliente podrá cancelar en cualquier momento
          mediante aviso por escrito al correo electrónico de la Cláusula 18, con al menos 5 (cinco) días
          naturales de anticipación a la siguiente fecha de cobro. La cancelación surte efectos al final del
          periodo en curso ya pagado.
        </p>
        <p className="mt-2">
          <strong>12.3. Efecto de la cancelación sobre el Closer.</strong> Al surtir efectos la cancelación, el
          Closer se retira de la operación del Cliente y cesan la supervisión, el soporte y las garantías de las
          Cláusulas 6 y 7. La cancelación no libera al Cliente de las obligaciones de la Cláusula 11 ni de las
          mensualidades diferidas bajo MSI frente a su institución emisora.
        </p>
        <p className="mt-2">
          <strong>12.4. Terminación por Closwork.</strong> Closwork podrá dar por terminado el contrato sin
          responsabilidad, mediante aviso con 15 (quince) días naturales de anticipación.
        </p>
        <p className="mt-2">
          <strong>12.5. Rescisión inmediata.</strong> Closwork podrá rescindir de inmediato, sin
          responsabilidad ni devolución, si el Cliente: (i) incurre en falta de pago conforme a la Cláusula
          8.12; (ii) incumple reiteradamente el pago de la Comisión del Closer; (iii) instruye al Closer a
          realizar prácticas engañosas o ilegales; (iv) impide la grabación o supervisión de llamadas; (v)
          incumple la Cláusula 11; o (vi) declara falsamente el Volumen Comprometido de Leads u otros datos
          determinantes del Formulario de Onboarding.
        </p>
        <p className="mt-2">
          <strong>12.6. Efectos de la terminación.</strong> Al terminar el contrato cesan la supervisión, el
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
          <strong>$8,000.00 USD (ocho mil dólares estadounidenses 00/100 M.E.)</strong>, pagadera dentro de los
          5 (cinco) días hábiles siguientes al requerimiento, sin perjuicio de las acciones civiles y penales
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
        <p className="mt-2">
          <strong>14.4.</strong> Closwork no interviene, condiciona ni participa en la contraprestación que el
          Cliente pacte con el Closer. Las cuotas a favor de Closwork son fijas y ajenas al desempeño comercial
          del Cliente y del Closer.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">15. GRABACIÓN Y MONITOREO DE LLAMADAS</h3>
        <p>
          <strong>15.1. Consentimiento.</strong> El Cliente autoriza expresamente a Closwork a grabar, escuchar,
          auditar y analizar las llamadas y videollamadas sostenidas por el Closer en el marco del Servicio, con
          la finalidad de supervisar el desempeño, retroalimentar al Closer, verificar los Estándares de
          Desempeño de la Cláusula 7.2 y mejorar el proceso de cierre. Sin esta autorización, el Servicio no
          puede prestarse.
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
          constituye un incumplimiento sustancial que impide verificar los Estándares de Desempeño, libera a
          Closwork de las garantías de las Cláusulas 6 y 7 y faculta la rescisión conforme a la Cláusula 12.5.
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
          acuerdo previo, verbal o escrito, sobre la misma materia, incluyendo cualquier presentación, propuesta
          o material comercial.
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
          Contratación, el precio contratado, la fecha y hora de aceptación, la versión de estos Términos y el
          identificador de la transacción.
        </p>
      </div>
    </div>
  );
};

export default ConciergeTyCContent;
