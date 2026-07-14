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
          TÉRMINOS Y CONDICIONES DEL SERVICIO CLOSWORK
        </h3>
        <p>Última actualización: 13 de julio de 2026</p>
        <p>Versión: 1.0</p>
      </div>

      <div className="rounded-md border border-amber-500/40 bg-amber-500/10 p-4">
        <h3 className="font-semibold text-base mb-2">AVISO IMPORTANTE — LEA ANTES DE PAGAR</h3>
        <p>
          Estos Términos y Condiciones (los &quot;Términos&quot;) constituyen un contrato de prestación de
          servicios legalmente vinculante entre:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-2 mt-3">
          <li>
            <strong>EL PRESTADOR:</strong> Kevin Daniel De Alba Méndez, por propio derecho, con domicilio en
            Tepic, Nayarit, México, quien opera comercialmente bajo la marca CLOSWORK (&quot;Closwork&quot;,
            &quot;nosotros&quot;); y
          </li>
          <li>
            <strong>EL CLIENTE:</strong> la persona física o moral cuyos datos de identificación fiscal y de
            contacto sean proporcionados al momento de realizar el pago (&quot;usted&quot;, &quot;el
            Cliente&quot;).
          </li>
        </ul>
        <p className="mt-3">Conjuntamente, &quot;las Partes&quot;.</p>
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
                <td className="py-2">Los servicios descritos en la Cláusula 3 de estos Términos.</td>
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
              <tr>
                <td className="py-2 pr-4 font-medium">Comisión del Closer</td>
                <td className="py-2">
                  La retribución variable que el Cliente pacta y paga directamente al Closer por las ventas
                  cerradas.
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
          <strong>2.3. Comprobante.</strong> Closwork conservará constancia electrónica de la aceptación (fecha,
          hora, versión de los Términos aceptada, identificador de la transacción de Stripe y, en su caso,
          dirección IP) y la pondrá a disposición del Cliente cuando éste lo solicite por escrito.
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
          <strong>3.1.</strong> Closwork prestará al Cliente los siguientes servicios profesionales:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
          <li>Diagnóstico inicial de la oferta, ticket promedio y flujo de leads del Cliente.</li>
          <li>
            Match y selección de un Closer cuyo perfil encaje con la vertical y el producto del Cliente.
          </li>
          <li>
            Colocación de un Closer certificado dentro de la operación del Cliente, incorporándolo a sus leads
            y materiales.
          </li>
          <li>
            Supervisión activa y monitoreo de las llamadas del Closer, con ajustes orientados a mejorar el
            proceso de cierre.
          </li>
          <li>Garantía de reemplazo del Closer en los términos de la Cláusula 5.</li>
          <li>
            Soporte y coordinación mediante un punto de contacto único para el Cliente y el Closer durante la
            vigencia del Servicio.
          </li>
        </ul>
        <p className="mt-2">
          <strong>3.2. Actividades accesorias.</strong> Closwork podrá desarrollar actividades secundarias
          inherentes al Servicio que resulten razonablemente necesarias para su cumplimiento. Cualquier
          servicio adicional fuera del alcance descrito requerirá acuerdo por escrito y podrá generar
          contraprestación adicional.
        </p>
        <p className="mt-2">
          <strong>3.3. Estándar de calidad.</strong> Closwork prestará el Servicio con diligencia profesional,
          apego a las disposiciones legales aplicables y bajo estándares de ética en los negocios.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">4. NATURALEZA DEL SERVICIO — OBLIGACIÓN DE MEDIOS</h3>
        <p>
          <strong>4.1.</strong> Las Partes reconocen expresamente que el Servicio consiste en la colocación,
          supervisión, reemplazo y soporte del Closer, y constituye una obligación de medios y no de
          resultados.
        </p>
        <p className="mt-2">
          <strong>4.2.</strong> Closwork NO garantiza un volumen, número, monto ni tasa de conversión
          determinados de ventas. Cualquier proyección, ejemplo o resultado histórico compartido por Closwork
          es meramente ilustrativo y no constituye promesa ni garantía de rendimiento.
        </p>
        <p className="mt-2">
          <strong>4.3.</strong> Closwork no es patrón, empleador, socio ni representante legal del Closer, ni
          percibe comisión alguna sobre las ventas del Cliente, ni interviene en el margen del Cliente.
        </p>
        <p className="mt-2">
          <strong>4.4.</strong> El resultado comercial depende de factores fuera del control de Closwork,
          incluyendo —de manera enunciativa— la calidad y volumen de los leads del Cliente, su oferta, precio,
          capacidad de entrega, materiales de venta y velocidad de respuesta.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">5. GARANTÍA DE REEMPLAZO</h3>
        <p>
          <strong>5.1.</strong> Si el Closer colocado no encaja con la oferta u operación del Cliente, Closwork
          lo reemplazará sin costo adicional, siempre que el Cliente lo solicite por escrito al correo
          señalado en la Cláusula 15, exponiendo los motivos.
        </p>
        <p className="mt-2">
          <strong>5.2.</strong> El reemplazo se sujeta a lo siguiente:
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
          <li>
            Closwork iniciará el proceso de match del nuevo Closer dentro de los [X] días hábiles siguientes a
            la solicitud, y buscará colocarlo dentro de los [Y] días hábiles siguientes, sujeto a
            disponibilidad de perfiles compatibles.
          </li>
          <li>
            La garantía aplica siempre que el Cliente se encuentre al corriente en sus pagos y haya cumplido
            con sus obligaciones de la Cláusula 8 (entrega de leads, materiales, accesos y retroalimentación).
          </li>
          <li>
            La garantía no cubre la falta de resultados de venta por sí sola, ni situaciones atribuibles al
            incumplimiento del Cliente.
          </li>
          <li>
            El reemplazo no suspende, prorroga ni bonifica la Suscripción ni genera derecho a devolución.
          </li>
        </ul>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">6. COMISIONES DEL CLOSER</h3>
        <p>
          <strong>6.1.</strong> La Comisión del Closer es definida, negociada y pagada directa e íntegramente
          por el Cliente al Closer.
        </p>
        <p className="mt-2">
          <strong>6.2.</strong> Closwork no funge como intermediario, retenedor, administrador ni garante de
          dichas comisiones, ni asume responsabilidad alguna por su cálculo, retención, entero de impuestos o
          pago.
        </p>
        <p className="mt-2">
          <strong>6.3.</strong> Cualquier controversia entre el Cliente y el Closer respecto de comisiones,
          pagos, cumplimiento o conducta se resolverá exclusivamente entre ellos. Closwork podrá, sin
          obligación, facilitar la comunicación entre las Partes.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">7. PRECIO, FACTURACIÓN Y FORMA DE PAGO</h3>
        <p>
          <strong>7.1. Contraprestación.</strong> El Cliente pagará una cuota fija mensual de $249.00 USD
          (doscientos cuarenta y nueve dólares estadounidenses 00/100 M.E.) más el I.V.A. correspondiente, con
          independencia del número o monto de ventas cerradas.
        </p>
        <p className="mt-2">
          <strong>7.2. Cobro recurrente.</strong> El pago se realiza mediante Stripe. Al aceptar estos
          Términos, el Cliente autoriza a Closwork a realizar cargos automáticos recurrentes al método de pago
          registrado, cada periodo mensual, hasta que la Suscripción sea cancelada conforme a la Cláusula 9.
        </p>
        <p className="mt-2">
          <strong>7.3. Fecha de cargo.</strong> El primer cargo se realiza al momento de la contratación. Los
          cargos subsecuentes se realizarán en la misma fecha de cada mes calendario (o el último día del mes
          cuando no exista fecha equivalente).
        </p>
        <p className="mt-2">
          <strong>7.4. Moneda y variaciones.</strong> Los precios están expresados en dólares estadounidenses.
          Cualquier diferencia cambiaria, comisión bancaria, cargo por conversión de divisa o cargo de la
          institución emisora del Cliente será a cargo exclusivo del Cliente.
        </p>
        <p className="mt-2">
          <strong>7.5. Impuestos y CFDI.</strong> Cada Parte es responsable de los impuestos que le
          correspondan. Closwork emitirá el CFDI correspondiente conforme a las disposiciones fiscales
          vigentes, con base en los Datos de Contratación proporcionados por el Cliente. Es responsabilidad
          exclusiva del Cliente proporcionar datos fiscales correctos; Closwork no será responsable por CFDI
          que no puedan emitirse o deban cancelarse por datos erróneos.
        </p>
        <p className="mt-2">
          <strong>7.6. Falta de pago.</strong> Si un cargo es rechazado o no se acredita el pago, Closwork
          podrá suspender el Servicio —incluyendo el acceso al Closer y la supervisión— previa notificación
          por correo electrónico, y rescindir el contrato si la falta de pago persiste por más de 10 (diez)
          días naturales.
        </p>
        <p className="mt-2">
          <strong>7.7. Devoluciones.</strong> Salvo disposición legal en contrario, las cuotas pagadas no son
          reembolsables, incluyendo el caso de cancelación a mitad de un periodo ya facturado. La cancelación
          surte efectos al final del periodo pagado, durante el cual el Cliente conserva el Servicio.
        </p>
        <p className="mt-2">
          <strong>7.8. Cambios de precio.</strong> Closwork podrá modificar el precio notificando al Cliente
          con al menos 30 (treinta) días naturales de anticipación al correo registrado. Si el Cliente no
          cancela antes de la siguiente fecha de cobro, se entenderá que acepta el nuevo precio.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">8. OBLIGACIONES DEL CLIENTE</h3>
        <p>El Cliente se obliga a:</p>
        <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
          <li>Pagar la contraprestación en tiempo y forma y mantener vigente un método de pago válido.</li>
          <li>
            Proporcionar los insumos necesarios para la prestación del Servicio: leads, materiales de venta,
            información de producto y precios, accesos a las herramientas requeridas (CRM, marcador, agenda,
            etc.) y cualquier otra información razonablemente solicitada.
          </li>
          <li>Definir y pagar directamente la Comisión del Closer.</li>
          <li>Dar retroalimentación oportuna sobre el desempeño del Closer.</li>
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
            Cláusula 11).
          </li>
        </ul>
        <p className="mt-2">
          <strong>8.2. Incumplimiento del Cliente.</strong> El incumplimiento de las obligaciones anteriores
          libera a Closwork de responsabilidad por la falta de prestación o degradación del Servicio, sin
          derecho a devolución ni bonificación.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">9. VIGENCIA, RENOVACIÓN Y CANCELACIÓN</h3>
        <p>
          <strong>9.1. Vigencia.</strong> Indefinida, con renovación automática por periodos mensuales
          sucesivos, mientras el Cliente no cancele.
        </p>
        <p className="mt-2">
          <strong>9.2. Cancelación por el Cliente.</strong> El Cliente podrá cancelar en cualquier momento
          mediante aviso por escrito al correo electrónico de la Cláusula 15, con al menos 5 (cinco) días
          naturales de anticipación a la siguiente fecha de cobro. La cancelación surte efectos al final del
          periodo en curso ya pagado.
        </p>
        <p className="mt-2">
          <strong>9.3. Terminación por Closwork.</strong> Closwork podrá dar por terminado el contrato sin
          responsabilidad, mediante aviso con 15 (quince) días naturales de anticipación.
        </p>
        <p className="mt-2">
          <strong>9.4. Efectos de la terminación.</strong> Al terminar el contrato cesan la supervisión, el
          soporte y la garantía de reemplazo. Subsisten las obligaciones de confidencialidad (Cláusula 12), la
          no elusión (Cláusula 10) y cualquier adeudo pendiente.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">10. NO ELUSIÓN</h3>
        <p>
          <strong>10.1.</strong> El Cliente reconoce que el Closer le fue presentado exclusivamente como
          consecuencia del Servicio y de la inversión de Closwork en reclutamiento, certificación y validación
          de perfiles.
        </p>
        <p className="mt-2">
          <strong>10.2.</strong> Durante la vigencia del contrato y por un plazo de 12 (doce) meses posteriores
          a su terminación, el Cliente se obliga a no contratar, retener ni continuar la relación comercial con
          cualquier Closer presentado por Closwork —directamente o a través de terceros, filiales o partes
          relacionadas— si la Suscripción fue cancelada, salvo que exista acuerdo previo y por escrito con
          Closwork.
        </p>
        <p className="mt-2">
          <strong>10.3.</strong> En caso de incumplimiento, el Cliente pagará a Closwork una pena convencional
          de $[monto] por cada Closer involucrado, sin perjuicio de las acciones legales que correspondan.
        </p>
        <p className="mt-3 text-muted-foreground italic">
          Nota: esta cláusula no limita el derecho del Closer a trabajar libremente; regula únicamente la
          conducta del Cliente frente a Closwork.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">11. AUSENCIA DE RELACIÓN LABORAL</h3>
        <p>
          <strong>11.1.</strong> Estos Términos constituyen un contrato de prestación de servicios de
          naturaleza mercantil. Las Partes reconocen que no se actualizan los supuestos de los artículos 10 y
          13 de la Ley Federal del Trabajo, ya que Closwork no queda sujeto a dirección, dependencia ni
          subordinación del Cliente.
        </p>
        <p className="mt-2">
          <strong>11.2.</strong> No se crea relación laboral, asociación, sociedad, coinversión, franquicia ni
          agencia entre las Partes, ni entre Closwork y el personal de cada una.
        </p>
        <p className="mt-2">
          <strong>11.3.</strong> El Closer es un profesional independiente. Cualquier relación —de la
          naturaleza que sea— que se genere entre el Cliente y el Closer es responsabilidad exclusiva del
          Cliente, quien se obliga a sacar en paz y a salvo e indemnizar a Closwork de cualquier reclamación
          laboral, de seguridad social, fiscal o administrativa que el Closer o cualquier autoridad presente en
          contra de Closwork con motivo de dicha relación.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">12. CONFIDENCIALIDAD</h3>
        <p>
          <strong>12.1. Definición.</strong> Se considera Información Confidencial toda información, dato,
          documento, conocimiento técnico, plan, estrategia, diseño, secreto comercial, base de leads,
          propiedad intelectual, precio o metodología que una Parte revele a la otra —de forma verbal,
          escrita, electrónica o de cualquier otra forma— que esté marcada como confidencial o que
          razonablemente deba considerarse como tal.
        </p>
        <p className="mt-2">
          <strong>12.2. Obligación recíproca.</strong> Cada Parte se obliga a no divulgar, copiar, reproducir,
          distribuir ni hacer accesible la Información Confidencial de la otra a terceros sin consentimiento
          previo y por escrito, ni a usarla para fin distinto al cumplimiento de estos Términos. Se exceptúa
          la divulgación requerida por autoridad competente y aquélla necesaria para prestar el Servicio
          (incluyendo la compartición con el Closer asignado, quien está sujeto a obligaciones de
          confidencialidad equivalentes).
        </p>
        <p className="mt-2">
          <strong>12.3. Excepciones.</strong> No se considera Información Confidencial aquélla que: (i) sea o
          llegue a ser de dominio público sin culpa de la Parte receptora; (ii) ya obrara legítimamente en
          poder de la Parte receptora; o (iii) sea desarrollada de forma independiente sin uso de la
          Información Confidencial.
        </p>
        <p className="mt-2">
          <strong>12.4. Vigencia.</strong> Esta obligación subsiste por 10 (diez) años contados a partir de la
          terminación del contrato, cualquiera que sea su causa.
        </p>
        <p className="mt-2">
          <strong>12.5. Pena convencional.</strong> La divulgación de Información Confidencial con dolo o mala
          fe, en beneficio propio o de terceros, dará derecho a la Parte afectada al pago de una pena
          convencional de $[monto] M.N., pagadera dentro de los 5 (cinco) días hábiles siguientes al
          requerimiento, sin perjuicio de las acciones civiles y penales previstas en la Ley Federal de
          Protección a la Propiedad Industrial y demás legislación aplicable.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">13. PROPIEDAD INTELECTUAL Y DATOS PERSONALES</h3>
        <p>
          <strong>13.1.</strong> Cada Parte conserva la titularidad de su propia propiedad intelectual,
          marcas, materiales y metodologías preexistentes. Nada en estos Términos transfiere derecho de
          propiedad alguno.
        </p>
        <p className="mt-2">
          <strong>13.2.</strong> Los materiales de venta, guiones y bases de leads aportados por el Cliente son
          y seguirán siendo propiedad del Cliente. Las metodologías, procesos de certificación, scorecards y
          herramientas de supervisión de Closwork son y seguirán siendo propiedad de Closwork.
        </p>
        <p className="mt-2">
          <strong>13.3. Datos personales.</strong> Cada Parte es responsable del tratamiento de los datos
          personales que recabe, en términos de la Ley Federal de Protección de Datos Personales en Posesión
          de los Particulares. El Cliente declara contar con la base legal necesaria para compartir con
          Closwork y con el Closer los datos de sus prospectos, y se obliga a sacar en paz y a salvo a
          Closwork ante cualquier reclamación derivada de la falta de dicha base legal. El Aviso de Privacidad
          de Closwork está disponible en{" "}
          <a href="/privacidad" className="text-primary underline underline-offset-2">
            /privacidad
          </a>
          .
        </p>
        <p className="mt-2">
          <strong>13.4. Referencias comerciales.</strong> Closwork podrá usar el nombre y logotipo del Cliente
          como referencia comercial. El Cliente puede revocar esta autorización en cualquier momento por
          escrito.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">14. LIMITACIÓN DE RESPONSABILIDAD</h3>
        <p>
          <strong>14.1.</strong> En la máxima medida permitida por la ley, la responsabilidad total y
          acumulada de Closwork frente al Cliente por cualquier concepto derivado de estos Términos no
          excederá el monto total efectivamente pagado por el Cliente a Closwork durante los 3 (tres) meses
          inmediatos anteriores al hecho que dio origen a la reclamación.
        </p>
        <p className="mt-2">
          <strong>14.2.</strong> Closwork no será responsable por lucro cesante, pérdida de oportunidades,
          daños indirectos, incidentales o consecuenciales, ni por los actos u omisiones del Closer frente al
          Cliente o frente a terceros.
        </p>
        <p className="mt-2">
          <strong>14.3.</strong> Ninguna limitación de esta cláusula aplica en casos de dolo o mala fe.
        </p>
        <p className="mt-2">
          <strong>14.4. Caso fortuito y fuerza mayor.</strong> Ninguna Parte será responsable por
          incumplimientos derivados de caso fortuito o fuerza mayor, incluyendo fallas generalizadas de
          telecomunicaciones o plataformas de terceros.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">15. NOTIFICACIONES</h3>
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
        <h3 className="font-semibold text-base mb-2">16. MODIFICACIONES A ESTOS TÉRMINOS</h3>
        <p>
          <strong>16.1.</strong> Closwork podrá modificar estos Términos. Los cambios se notificarán al correo
          registrado del Cliente con al menos 30 (treinta) días naturales de anticipación y se publicarán en{" "}
          <a href="/tyc-concierge" className="text-primary underline underline-offset-2">
            /tyc-concierge
          </a>
          .
        </p>
        <p className="mt-2">
          <strong>16.2.</strong> La continuación del uso del Servicio o el pago del siguiente periodo
          posterior a la entrada en vigor de los cambios constituye aceptación de los Términos modificados. Si
          el Cliente no está de acuerdo, su único recurso es cancelar la Suscripción antes de la siguiente
          fecha de cobro.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">17. MISCELÁNEOS</h3>
        <p>
          <strong>17.1. Cesión.</strong> Ninguna Parte podrá ceder sus derechos u obligaciones sin
          consentimiento previo y por escrito de la otra, salvo que Closwork ceda el contrato a una sociedad
          de la que sea socio o accionista, o como parte de una reestructura o venta de su negocio, en cuyo
          caso bastará el aviso al Cliente.
        </p>
        <p className="mt-2">
          <strong>17.2. Acuerdo total.</strong> Estos Términos, junto con los Datos de Contratación,
          constituyen el acuerdo total entre las Partes y sustituyen cualquier acuerdo previo, verbal o
          escrito, sobre la misma materia.
        </p>
        <p className="mt-2">
          <strong>17.3. Divisibilidad.</strong> Si alguna disposición se declara inválida, el resto
          permanecerá vigente, interpretándose en lo posible conforme a la voluntad original de las Partes.
        </p>
        <p className="mt-2">
          <strong>17.4. Renuncia.</strong> La falta o demora en el ejercicio de un derecho no implica renuncia
          al mismo ni a derechos futuros.
        </p>
        <p className="mt-2">
          <strong>17.5. Encabezados.</strong> Los encabezados son sólo de referencia y no definen ni limitan
          el contenido de las cláusulas.
        </p>
        <p className="mt-2">
          <strong>17.6. Ausencia de vicios del consentimiento.</strong> Las Partes declaran que los términos
          pactados son justos y legítimos, y que no existe dolo, error, lesión, enriquecimiento ilegítimo ni
          cualquier otro vicio del consentimiento.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-base mb-2">18. LEY APLICABLE Y JURISDICCIÓN</h3>
        <p>
          <strong>18.1.</strong> Estos Términos se rigen e interpretan conforme al Código de Comercio y demás
          legislación federal mexicana aplicable.
        </p>
        <p className="mt-2">
          <strong>18.2.</strong> Para todo lo relativo a su interpretación y cumplimiento, las Partes se
          someten expresamente a la jurisdicción y competencia de los tribunales del fuero común del municipio
          de Tepic, Nayarit, renunciando de manera expresa e irrevocable a cualquier otro fuero que pudiera
          corresponderles por razón de sus domicilios presentes o futuros o por cualquier otro motivo.
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
