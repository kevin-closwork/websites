interface EmpresasTyCContentProps {
  onScrollToBottom?: () => void;
}

const EmpresasTyCContent = ({ onScrollToBottom }: EmpresasTyCContentProps) => {
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
      <h3 className="font-semibold text-base mb-2">Condiciones Generales</h3>
      <p>Bienvenido. Closwork (en adelante &quot;la Empresa&quot;), es la encargada de operar el Sitio. Los presentes términos y condiciones generales de uso tienen por objeto regular el acceso y uso que hagas del Sitio, el cual es https://closwork.com/. Asimismo, para efectos de claridad en adelante nos referiremos a cualquier persona que acceda o se registre como el &quot;Usuario&quot;, término que engloba tanto al &quot;Cliente&quot; (empresa o persona que busca contratar fuerza de ventas) como al &quot;Vendedor&quot; (persona física que ofrece servicios de promoción y ventas bajo comisión).</p>
      <p className="mt-2">Al entrar al sitio, el usuario manifiesta su conformidad y aceptación completa de los Términos y Condiciones, así como a nuestro aviso de privacidad.</p>
      <p className="mt-2">Los presentes Términos y Condiciones podrán estar sujetas a cualquier tipo de variación, modificación, cambio, ajuste, adición o complemento en el futuro o en el momento en el que lo considere oportuno Closwork, en el entendido que, dichas actualizaciones surtirán sus efectos en el momento en el que las publiquemos en el Sitio.</p>
      <p className="mt-2">El sitio cuenta con un mecanismo para que el Consumidor, cliente o usuario, acepte los términos y condiciones, sin embargo, es distinta para el tratamiento de los Datos personales de los usuarios, para lo que se deberá aceptar a su vez el mismo aviso de privacidad.</p>
      <p className="mt-2">Nuestros servicios sólo están disponibles para personas que tengan capacidad legal para contratar. El uso de la plataforma está limitado a personas mayores de 18 años. No podrán utilizar los servicios, los menores de edad, quienes no tengan esa capacidad o Leads y las personas que hayan sido suspendidas o dadas de baja del sistema de El Sitio. En caso de representar una empresa o proveedor, el usuario declara contar con las facultades legales para actuar en nombre de la misma.</p>
      <p className="mt-2">Toda la información general respecto a la identificación de la empresa se encuentra al final de los presentes términos y condiciones.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Servicios y Alcance de la Plataforma</h3>
      <p>Closwork opera como una plataforma tecnológica de intermediación y marketplace B2B (Business to Business) y B2C (Business to Consumer). El objeto primordial es facilitar el contacto, la gestión y la vinculación operativa entre empresas o personas físicas que requieren servicios de comercialización y personas físicas con capacidad legal para ejecutar dichas ventas bajo esquemas de comisión.</p>
      <p className="mt-2">La Empresa no es una agencia de colocación de empleo, no es una institución financiera, ni interviene como parte en los contratos de comisión mercantil o prestación de servicios que los Usuarios celebren entre sí. La labor de Closwork se limita a la provisión de la infraestructura digital (SaaS) para la optimización de la fuerza de ventas.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Registro, Capacidad y Veracidad de la Información</h3>
      <p>Para acceder a las funcionalidades de la Plataforma, el Usuario debe completar un proceso de registro.</p>
      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
        <li><strong>Capacidad:</strong> El Usuario declara, bajo protesta de decir verdad, que cuenta con la capacidad legal suficiente para obligarse en términos de la legislación mexicana. Los menores de edad tienen estrictamente prohibido el uso de la Plataforma.</li>
        <li><strong>Perfiles:</strong> El Cliente deberá proporcionar información fidedigna sobre su situación fiscal y el producto/servicio a promover. El vendedor deberá acreditar su identidad y perfil profesional.</li>
        <li><strong>Responsabilidad de Cuenta:</strong> El Usuario es el único responsable de mantener la confidencialidad de sus credenciales. Cualquier actividad realizada bajo su cuenta se presumirá realizada por el titular de la misma.</li>
      </ul>
      <p className="mt-2">Se mostrarán los medios de pago disponibles para completar la Transacción comercial. El pago podrá realizarse en una sola exhibición o mediante pagos diferidos según aplique a cada usuario con base en sus políticas de anticipos definidas en nuestra plataforma.</p>
      <p className="mt-2">Cada solicitud realizada a través del sitio estará regido por estas Condiciones. Al realizar una solicitud, el Cliente reconoce que ha leído, comprendido y aceptado, sin reserva alguna, las presentes Condiciones.</p>
      <p className="mt-2">Los servicios son ofrecidos en esta página web dentro de los límites de las cantidades disponibles.</p>
      <p className="mt-2">La empresa se reserva el derecho de rechazar solicitudes, por causas de fuerza mayor, incumplimiento de condiciones, afectación a terceros o en caso de impago. La información registrada constituye prueba absoluta de la solicitud y de toda la transacción. En su caso, la información registrada por el sistema de pago constituye prueba absoluta de las transacciones financieras.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Modelo Económico</h3>
      <p>El uso de la Plataforma conlleva el pago de las siguientes contraprestaciones a favor de la Empresa:</p>
      <p className="mt-2"><strong>4.1 Suscripción Mensual:</strong> El Cliente pagará una cuota fija mensual por concepto de mantenimiento de cuenta, acceso a la base de datos de vendedores y uso de herramientas de gestión. Esta cuota se cobrará por períodos adelantados.</p>
      <p className="mt-2"><strong>4.3 Mecanismo de Reporte:</strong> La Empresa se reserva el derecho de solicitar al Cliente estados de cuenta o facturación anonimizada que respalde el volumen de ventas reportado. El ocultamiento de ventas será causa de rescisión inmediata sin responsabilidad para Closwork.</p>
      <p className="mt-2"><strong>4.4 Impuestos:</strong> Todas las cantidades pactadas serán incrementadas con el Impuesto al Valor Agregado (IVA) correspondiente.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Prohibición de elusión y contacto directo</h3>
      <p>Los Usuarios (tanto Clientes como Vendedores) reconocen que la Plataforma es el medio exclusivo para el contacto, gestión y registro de las ventas derivadas de la vinculación operativa facilitada por Closwork. Por lo tanto:</p>
      <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
        <li><strong>Exclusividad de Mediación:</strong> El Cliente y el Vendedor se obligan a no eludir, de manera directa o indirecta, el pago de las comisiones pactadas en estos Términos. Queda estrictamente prohibido realizar transacciones, pagos o contrataciones de servicios derivados de un contacto iniciado en la Plataforma fuera de la infraestructura digital de Closwork.</li>
        <li><strong>Periodo de Restricción:</strong> Esta prohibición de contacto directo para fines de contratación mercantil externa tendrá una vigencia de 12 (doce) meses contados a partir de la fecha del primer contacto entre el Cliente y el Vendedor dentro de la Plataforma.</li>
        <li><strong>Pena Convencional:</strong> En caso de que Closwork detecte que un Cliente y un Vendedor han perfeccionado una venta o relación comercial derivada de la Plataforma sin reportar la comisión correspondiente, el Cliente infractor se obliga a pagar a la Empresa, por concepto de pena convencional, la cantidad equivalente a 12 meses de suscripción nivel Premium o el triple del monto de la comisión eludida, lo que resulte mayor, sin perjuicio del derecho de la Empresa de ejercer acciones legales por daños y perjuicios.</li>
        <li><strong>Sanción Administrativa:</strong> El incumplimiento de esta cláusula facultará a Closwork para la cancelación inmediata y definitiva de las cuentas de ambos Usuarios involucrados, perdiendo estos cualquier derecho sobre suscripciones vigentes.</li>
      </ol>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Política de Cancelación y suspensión de la Cuenta de Usuario</h3>
      <p>La Empresa podrá en cualquier momento suspender o cerrar su Cuenta, y su capacidad para utilizar uno o más de los Servicios, o una parte de los Servicios, y ello de manera automática y sin necesidad de trámite alguno, tras remitirle por correo electrónico o por correo postal un requerimiento formal para que ponga fin a una determinada violación o aporte prueba de sus credenciales y demás documentación comprobatoria de su personalidad y/o capacidad que no se hubiera visto atendido inmediatamente, si se confirmara, o si la empresa tuviera motivos razonables para creer que usted ha incurrido en incumplimiento a los presentes términos y condiciones.</p>
      <p className="mt-2">Si usted contara con más de una Cuenta, la empresa se reserva el derecho de suprimir todas las cuentas que usted hubiera abierto.</p>
      <p className="mt-2">En cualquier momento usted podrá poner fin a su Cuenta o de la suscripción a un determinado Servicio o Servicios, de manera automática y sin necesidad de trámite judicial alguno, notificándose mediante el mismo procedimiento establecido de los presentes Términos y enviando su escrito al correo electrónico ahí proporcionado.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Política de uso de datos</h3>
      <p>Además de lo dispuesto en la política de privacidad y aviso de privacidad respectivo, el cliente autoriza a La Empresa para hacer uso de toda la información publicada, para fines publicitarios, estadísticos y de evaluación, aun después de cerrada su Cuenta y por todo el tiempo que la ley aplicable, en su caso, lo permita. Se informa al Usuario que la plataforma utiliza cookies y herramientas de rastreo.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Uso de los servicios</h3>
      <p>Como parte de los Servicios ofrecidos, La Empresa, incluye herramientas de software altamente funcionales para procesar y automatizar la información, como lo pueden ser conexiones a fuentes o bases de datos externas que se comparte por los Usuarios en la plataforma web y contenidos, a efecto de brindar un mejor Servicio.</p>
      <p className="mt-2">No obstante, La Empresa no garantiza la veracidad de la información que los Usuarios (Clientes o Vendedores) comparten en las Plataformas Web, ni la proporcionada por las diversas fuentes de datos.</p>
      <p className="mt-2">Por lo anterior, La Empresa no tiene ninguna responsabilidad respecto a la veracidad de la información que aporten los Usuarios a la plataforma web o que terceros proporcionen a la Empresa.</p>
      <p className="mt-2">Los Servicios están destinados únicamente a su uso personal, en su caso, de las terceras personas involucradas y el cliente no deberá en ningún caso utilizarlos en modo alguno diverso a los fines comerciales para los cuales son proporcionados.</p>
      <p className="mt-2">La información y publicidad que se proporciona en el sitio es veraz, comprobable, clara, por lo que si generase confusión al Usuario favor de solicitar información previa a la contratación a los medios de comunicación proporcionados. La Empresa se deslinda de toda responsabilidad respecto a la contratación de productos de terceros no ofertados por ella misma que el Cliente haya contratado por medio de anuncios publicitarios.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Exclusión de Relación Laboral y Autonomía de las Partes</h3>
      <p>Las partes reconocen expresamente que la relación entre la Empresa y los Usuarios (Clientes y Vendedores) es de naturaleza estrictamente mercantil.</p>
      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
        <li>No existe subordinación, dependencia económica, ni dirección de mando entre la Empresa y los Vendedores.</li>
        <li>Los Vendedores actúan como comisionistas independientes bajo los términos del Artículo 273 del Código de Comercio.</li>
        <li>El Cliente es el único responsable de las obligaciones laborales, de seguridad social (IMSS, INFONAVIT) o fiscales que pudieran derivar de su relación directa con los Vendedores.</li>
        <li>El Vendedor utiliza sus propios medios, herramientas y equipo para realizar las ventas, Closwork no asigna tareas ni supervisa el proceso de venta, solo registra el resultado para efectos de comisión.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Normas de conducta</h3>
      <p>Concretamente, el Usuario se compromete a no realizar, ni directa ni indirectamente, ninguna de las siguientes conductas:</p>
      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
        <li>Utilizar cualquier elemento o contenido que pudiera constituir una violación de los derechos de propiedad intelectual u otros derechos, como lo puede ser el secreto industrial, el derecho a la intimidad y/o a la propia imagen, y/o de cualquier otro derecho;</li>
        <li>Crear, utilizar, compartir y/o editar, por cualquier medio (en foros, mensajes directos, perfiles públicos o por cualquier otro medio), dentro del ámbito de los Servicios, cualquier material (texto, palabras, imágenes, sonidos, vídeos, etcétera) o contenido que de acuerdo con los presentes Términos, la ley, las costumbres generalmente aceptadas y el orden público, resulte agresivo, amenazante, malicioso, difamatorio, incierto, pornográfico, pedófilo, obsceno, vulgar, racista, xenófobo, susceptible de incitar al odio, o sexualmente explícito, violento, contrario a la moral o que, de cualquier otro modo, resulte inaceptable;</li>
        <li>Crear, utilizar, compartir y/o editar, por cualquier medio (en foros, mensajes directos, perfiles públicos o por cualquier otro medio), dentro del ámbito de los Servicios, cualquier material (texto, palabras, imágenes, sonidos, vídeos, etcétera) que resultara constitutivo de una violación de una obligación de confidencialidad, o que incitara a la comisión de hechos ilícitos;</li>
        <li>Llevar a cabo actividades dirigidas a acceder a elementos o funciones de los Servicios cuyo uso no hubiera sido autorizado;</li>
        <li>Arreglar, modificar, traducir, adaptar, reproducir, indiciar, copiar y/o extraer, por cualquier procedimiento, cualquier información, base de datos, o cualquier otro elemento del Sitio, sin la previa autorización expresa;</li>
        <li>Modificar, distorsionar, bloquear, cargar anormalmente, interrumpir, ralentizar y/o dificultar el normal funcionamiento de la totalidad o de parte del sitio, o la accesibilidad de otros Usuarios a los mismos, o el funcionamiento de las redes asociadas de los mismos, o la tentativa de llevar a cabo cualquiera de las anteriores acciones;</li>
        <li>Transmitir o propagar cualquier virus, troyano, gusano, bomba, fichero corrompido y/o cualquier dispositivo destructivo semejante o cualquier tipo de dato corrompido dentro del ámbito del sitio, y/u organizar, participar en, o estar involucrado de cualquier modo en cualquier tipo de ataque a los servidores;</li>
        <li>Crear, utilizar y/o difundir programas informáticos automáticos o &quot;macros&quot;, incluidos, sin carácter exhaustivo, programas o aplicaciones &quot;cheats&quot;, &quot;hacks&quot;, &quot;mods&quot;, &quot;bots&quot; y &quot;trainers&quot;, y/o utilizar los Servicios a través de un sitio espejo (mirror site);</li>
        <li>Crear o facilitar cualquier otro mecanismo que permita la utilización de los Servicios por parte de otras personas;</li>
        <li>Acosar a otros Usuarios, enviarles mensajes no solicitados con finalidades de investigación comercial, utilizar los Servicios con fines de operaciones de investigación, competencia, ventas piramidales u otros semejantes, o para el envío masivo de correos electrónicos, de correo basura (spam) o de elementos promocionales o publicitarios no solicitados, ya fuera con fines comerciales o de cualquier otro tipo;</li>
        <li>Utilizar información incorrecta, utilizar la Cuenta de otro Usuario, asumir la identidad de otra persona o presentar credenciales falsas en sus relaciones con cualquier persona física o jurídica dentro del ámbito de los Servicios o durante la utilización de los mismos;</li>
        <li>Utilizar cualquier mecanismo no expresamente autorizado por Closwork para la captación o interceptación de datos intercambiados por otros Usuarios dentro del ámbito del sitio, o los nombres/nombres de pantalla y/o contraseñas de cualquier otro Usuario;</li>
        <li>Intentar obtener una contraseña o información relativa a una Cuenta, o cualquier otra información de naturaleza privada, de cualquier otro Usuario de los Servicios y/o vender, alquilar, compartir, prestar y/o de cualquier otro modo transferir a cualquier tercero ajeno su Cuenta y/o los mecanismos de acceso a la misma y/o, de cualquier otro modo, permitir que cualquier tercero ajeno se beneficie de su Cuenta;</li>
        <li>Realizar un uso inapropiado del sistema de ayuda o de los botones de reclamaciones.</li>
        <li>Subir información falsa y/o engañosa con cualquier fin.</li>
      </ul>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Sanciones</h3>
      <p>En caso de que el Usuario incumpla con los presentes términos, o bien incurra en algunas de las conductas señaladas en el punto inmediato anterior, Closwork podrá discrecionalmente ejercer las siguientes acciones:</p>
      <ol className="list-decimal list-inside space-y-1 ml-4 mt-2">
        <li>Cancelar la cuenta del Usuario de forma temporal o permanente o en su caso negar la prestación del servicio.</li>
        <li>Proceder legalmente solicitando el pago de daños y perjuicios que en su momento se llegasen a causar.</li>
      </ol>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Disposiciones de Propiedad intelectual</h3>
      <p>Además de lo establecido en los párrafos anteriores, el Usuario reconoce y acepta que:</p>
      <p className="mt-2"><strong>Protección de la Base de Datos:</strong> La recopilación, organización, estructura y disposición de los perfiles de Usuarios (vendedores y clientes), así como la información comercial generada en el Sitio, constituyen una Base de Datos propiedad exclusiva de la Empresa. Esta información es considerada un Secreto Industrial en términos de la Ley Federal de Protección a la Propiedad Industrial, al tener un valor comercial y económico frente a terceros.</p>
      <p className="mt-2"><strong>Prohibición de Extracción (Anti-Scraping):</strong> Queda estrictamente prohibido el uso de cualquier sistema automatizado, &quot;scripts&quot;, &quot;bots&quot;, &quot;web scraping&quot;, &quot;spiders&quot; o cualquier método manual o automático para extraer, copiar, indexar o reutilizar, total o parcialmente, la lista de vendedores, clientes o cualquier dato contenido en la plataforma para la creación de bases de datos propias o ajenas fuera del Sitio.</p>
      <p className="mt-2"><strong>Uso Restringido:</strong> El acceso a la información de los perfiles de otros Usuarios se concede bajo una licencia de uso personal, no exclusiva y revocable, destinada únicamente a la vinculación comercial dentro de Closwork. Cualquier uso fuera de este ámbito se considerará una violación a los derechos de propiedad intelectual y una apropiación indebida de secretos industriales.</p>
      <p className="mt-2"><strong>Sanciones:</strong> El incumplimiento de esta disposición facultará a la Empresa para rescindir la cuenta del Usuario sin previo aviso, además de ejercer las acciones legales, civiles y penales correspondientes por la divulgación o aprovechamiento de secretos industriales y violación de derechos de autor.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Modificación de los términos, software y/o servicios</h3>
      <p>Closwork, se reserva el derecho de, en cualquier momento y de manera plenamente discrecional, cambiar, modificar, añadir o suprimir cláusulas en los presentes Términos y en las demás notificaciones incluidas en el sitio, tanto de manera provisional como de manera permanente.</p>
      <p className="mt-2">Por consiguiente, el cliente se compromete a comprobar periódicamente cualquier posible modificación y a observar las mismas íntegramente.</p>
      <p className="mt-2">Closwork se reserva el derecho de optimizar cualquiera de sus Servicios para una resolución y/o para un navegador diferente.</p>
      <p className="mt-2">Los Servicios le pueden solicitar permiso, o le pueden habilitar para que descargue archivos e información en su ordenador o en cualquier otro soporte autorizado.</p>
      <p className="mt-2">Closwork puede ocasionalmente suministrar actualizaciones o modificaciones del interfaz. Usted acepta que pueden resultar necesarias determinadas actualizaciones y modificaciones al objeto de poder seguir utilizando los Servicios.</p>
      <p className="mt-2">Closwork puede modificar los Contenidos o Servicios por cualquier causa, o sin especificar la causa, en cualquier momento, y en especial por razones vinculadas a cambios tecnológicos.</p>
      <p className="mt-2">En concreto, Closwork puede entender necesario llevar a cabo actualizaciones y/o operaciones de mantenimiento para mejorar y/u optimizar los Servicios. Estas actualizaciones, operaciones de mantenimiento y/o reinicializaciones pueden llegar a afectar los Servicios y/o a sus derechos adquiridos, o a cualquier otro elemento conexo.</p>
      <p className="mt-2">Por último, y con independencia de sus derechos al respecto, Closwork se reserva la facultad de: (a) restringir el acceso a la totalidad o parte de los Servicios a un determinado Usuario y/o (b) suprimir la totalidad o parte de los Servicios, y ello de manera plenamente discrecional, estando obligado Closwork únicamente a avisar a sus Usuarios previamente con por lo menos treinta (30) días de anticipación a la fecha en la que pretenda realizar dicha supresión, mediante una publicación en la plataforma digital correspondiente al Servicio que pretenda suprimir o a través de un correo electrónico, enviado a la dirección de correo registrada en la cuenta.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Modificación de las comisiones y precios</h3>
      <p>La empresa se reserva el derecho de: modificar los precios de los Servicios facilitados o prestados, respecto de los costos y montos de las contraprestaciones de los mismos; y modificar un Servicio de un servicio de pago a un servicio gratuito, o viceversa, en el entendido de que los nuevos precios y costos se aplicarán únicamente a los pedidos vigentes tras la entrada en vigor, si procede, de los nuevos precios o costos.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Información sobre el bloqueo de elementos emergentes</h3>
      <p>Su navegador puede estar configurado para impedir la visualización de elementos emergentes. Determinados contenidos se visualizan en forma de elementos emergentes. Para optimizar el uso, asegúrese de tener desactivada la función de bloqueo de elementos emergentes.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Privacidad</h3>
      <p>Los datos personales necesarios para el cumplimiento de los servicios solicitados por el Usuario, tales como el procesamiento de pagos, suscripciones y transacciones financieras, podrán ser tratados por proveedores especializados bajo estrictas medidas de seguridad, limitándose exclusivamente a las finalidades necesarias para la operación de la plataforma y en total apego a lo dispuesto en nuestro Aviso de Privacidad respecto a las transferencias estrictamente necesarias para la prestación del servicio.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Confidencialidad</h3>
      <p>El cliente manifiesta que con la aceptación de los presentes Términos, y en razón de la relación que en virtud del uso del sitio, pudieren llegar a tener acceso a datos, información y documentos, o de terceros, que pudiera ser considerada de carácter confidencial y que sólo se divulga entre sí en virtud de la relación establecida en los presentes Términos y/o los contratos de prestación de servicios que al efecto se celebren entre los Usuarios. Por lo tanto, dicha información será tratada con el carácter de confidencial (&quot;Información Confidencial&quot;).</p>
      <p className="mt-2">La Información Confidencial incluye expresamente y sin limitación, toda la información que se divulgue, entre usted y la empresa o entre usted y terceros, por medio del sitio, en cualquier forma o que éstos lleguen a conocer previamente o durante la vigencia de su relación jurídica y comercial conforme a los presentes Términos, concerniente, relacionada o derivada de las actividades que cada una realiza; y que incluye procedimientos, técnicas, planes, proyectos, actividades, investigación, conocimientos técnicos, secretos industriales, prácticas comerciales, clientes, especificaciones, tecnología, información de clientes o de mercado, acuerdos contractuales, utilidades, ventas, políticas de precios, métodos operativos, procesos técnicos, políticas comerciales, prácticas y demás asuntos comerciales y métodos, planes y demás información técnica, legal, comercial y financiera, e información recibida de terceros que las partes estén obligadas a considerar como confidencial o propia y que pueda transmitirse por cualquier medio, incluyendo sin limitación, vía oral, visual, escrita y/o electrónica.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Marco legal y jurisdicción aplicables</h3>
      <p>Los presentes Términos están materializados en un mensaje de datos en términos del artículo ochenta y nueve del Código de Comercio, por lo que de conformidad con el artículo ochenta y nueve bis del mismo ordenamiento no podrá negársele validez alguna por el simple hecho de hacerse constar en un mensaje de datos. Para tales efectos, tanto los Usuarios o clientes como la empresa reconocen que la celebración del presente acuerdo de voluntades traducido en estos Términos se celebra de conformidad con las disposiciones al efecto establecidas en el Capítulo I del Título Segundo del Código de Comercio Vigente en la República Mexicana.</p>
      <p className="mt-2">El cliente acuerda que el presente mensaje de datos contiene una oferta vinculante y creadora de obligaciones en el momento de su aceptación o de su uso, toda vez que la misma está formulada al público en general sin estar determinado algún destinatario o aceptante, por lo que los derechos y obligaciones contenidas en el presente contrato comenzarán en su vigencia a partir de la voluntad de Usted en aceptar las obligaciones contenidas en estos Términos y de que se cumplan correctamente con todas las condiciones suspensivas en los mismos y comience a hacer uso del sitio que la empresa pone a su disposición conforme a los presentes Términos.</p>
      <p className="mt-2">El cliente conviene en que, en todo lo establecido y no establecido en los presentes Términos, se estará a lo dispuesto en la legislación que al efecto resulte aplicable en el estado de Jalisco, México.</p>
      <p className="mt-2">De igual manera, el cliente acuerda que en caso de que cualquier controversia, interpretación y/o cumplimiento de estos Términos deba someterse a decisión judicial, estas estarán a la jurisdicción y competencia exclusiva de los tribunales competentes en la ciudad de Guadalajara, Jalisco, México renunciando en este momento a cualquier otro fuero que pudiese corresponderles en razón de su domicilio presente o futuro, o por cualquier otra causa.</p>
    </div>

    <div>
      <h3 className="font-semibold text-base mb-2">Contacto</h3>
      <p>Los datos de contacto y medios oficiales de comunicación del representante y responsable legal de la empresa son los siguientes:</p>
      <table className="mt-2 w-full text-sm border-collapse">
        <tbody>
          <tr><td className="font-semibold py-1 pr-4">Nombre comercial de la Empresa</td><td>Closwork</td></tr>
          <tr><td className="font-semibold py-1 pr-4">Denominación social</td><td>MIO MOBILE S.A. DE C.V.</td></tr>
          <tr><td className="font-semibold py-1 pr-4">Nacionalidad de la Empresa</td><td>Mexicana</td></tr>
          <tr><td className="font-semibold py-1 pr-4">Domicilio</td><td>CALLE C 154, 15 DE MAYO, TEPIC, NAYARIT</td></tr>
          <tr><td className="font-semibold py-1 pr-4">Correos electrónicos / Teléfonos</td><td>hola@closwork.com</td></tr>
          <tr><td className="font-semibold py-1 pr-4">Liga o link del sitio</td><td><a href="https://closwork.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://closwork.com/</a></td></tr>
        </tbody>
      </table>
      <p className="mt-4">Los presentes Términos son de aplicación únicamente en la medida en que así lo autorice la ley. Cualquier utilización de los Servicios requiere la aceptación sin reserva de los presentes Términos.</p>
      <p className="mt-2">Mediante la aceptación de los presentes Términos otorga su consentimiento para que la responsable, es decir La Empresa, actúe conforme a los Términos aquí planteados por medio de cualquiera de sus representantes legales.</p>
      <p className="mt-4 font-semibold">Con respecto a los servicios proporcionados por la empresa, puede visitar las siguientes páginas web en dónde encontrará información sobre sus derechos como consumidor y los mecanismos legales con los que cuenta para poder protegerlos:</p>
      <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
        <li><strong>PROCURADURÍA FEDERAL DEL CONSUMIDOR:</strong> <a href="https://www.profeco.gob.mx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.profeco.gob.mx</a></li>
        <li><strong>INSTITUTO NACIONAL DE TRANSPARENCIA, ACCESO A LA INFORMACIÓN Y PROTECCIÓN DE DATOS PERSONALES:</strong> <a href="https://www.inai.org.mx" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.inai.org.mx</a></li>
      </ul>
    </div>
  </div>
  );
};

export default EmpresasTyCContent;
