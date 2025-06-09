import React from 'react';
import { Mail, Phone, MapPin, Building } from 'lucide-react';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Algemene Voorwaarden</h1>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Table of Contents */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Inhoudsopgave</h2>
          <div className="grid md:grid-cols-2 gap-3">
            <a href="#artikel-1" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 1 - Definities</a>
            <a href="#artikel-2" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 2 - Identiteit van de ondernemer</a>
            <a href="#artikel-3" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 3 - Toepasselijkheid</a>
            <a href="#artikel-4" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 4 - Het aanbod</a>
            <a href="#artikel-5" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 5 - De overeenkomst</a>
            <a href="#artikel-6" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 6 - Herroepingsrecht</a>
            <a href="#artikel-7" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 7 - Kosten in geval van herroeping</a>
            <a href="#artikel-8" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 8 - Uitsluiting herroepingsrecht</a>
            <a href="#artikel-9" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 9 - De prijs</a>
            <a href="#artikel-10" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 10 - Conformiteit en garantie</a>
            <a href="#artikel-11" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 11 - Levering en uitvoering</a>
            <a href="#artikel-12" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 12 - Duurtransacties</a>
            <a href="#artikel-13" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 13 - Betaling</a>
            <a href="#artikel-14" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 14 - Klachtenregeling</a>
            <a href="#artikel-15" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 15 - Geschillen</a>
            <a href="#artikel-16" className="text-blue-600 hover:text-blue-800 hover:underline py-1">Artikel 16 - Aanvullende bepalingen</a>
          </div>
        </div>

        {/* Article 1 - Definities */}
        <section id="artikel-1" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 1 - Definities</h2>
          <p className="mb-4 text-gray-700">In deze voorwaarden wordt verstaan onder:</p>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 leading-relaxed">
            <li><strong>Bedenktijd:</strong> de termijn waarbinnen de consument gebruik kan maken van zijn herroepingsrecht;</li>
            <li><strong>Consument:</strong> de natuurlijke persoon die niet handelt in de uitoefening van beroep of bedrijf en een overeenkomst op afstand aangaat met de ondernemer;</li>
            <li><strong>Dag:</strong> kalenderdag;</li>
            <li><strong>Duurtransactie:</strong> een overeenkomst op afstand met betrekking tot een reeks van producten en/of diensten, waarvan de leverings- en/of afnameverplichting in de tijd is gespreid;</li>
            <li><strong>Duurzame gegevensdrager:</strong> elk middel dat de consument of ondernemer in staat stelt om informatie die aan hem persoonlijk is gericht, op te slaan op een manier die toekomstige raadpleging en ongewijzigde reproductie van de opgeslagen informatie mogelijk maakt;</li>
            <li><strong>Herroepingsrecht:</strong> de mogelijkheid voor de consument om binnen de bedenktijd af te zien van de overeenkomst op afstand;</li>
            <li><strong>Ondernemer:</strong> de natuurlijke of rechtspersoon die producten en/of diensten op afstand aan consumenten aanbiedt;</li>
            <li><strong>Overeenkomst op afstand:</strong> een overeenkomst waarbij in het kader van een door de ondernemer georganiseerd systeem voor verkoop op afstand van producten en/of diensten, tot en met het sluiten van de overeenkomst uitsluitend gebruik gemaakt wordt van één of meer technieken voor communicatie op afstand;</li>
            <li><strong>Techniek voor communicatie op afstand:</strong> middel dat kan worden gebruikt voor het sluiten van een overeenkomst, zonder dat consument en ondernemer gelijktijdig in dezelfde ruimte zijn samengekomen.</li>
          </ol>
        </section>

        {/* Article 2 - Identiteit */}
        <section id="artikel-2" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 2 - Identiteit van de ondernemer</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Building className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Naam ondernemer:</p>
                  <p className="text-gray-700">Rowena Kuik</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Vestigingsadres:</p>
                  <p className="text-gray-700">Abdissenlaan 18<br />6374 BH</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Phone className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">Telefoonnummer:</p>
                  <p className="text-gray-700">0648582729</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Mail className="text-blue-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-gray-900">E-mailadres:</p>
                  <p className="text-gray-700">Onlineproducts202323@gmail.com</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">KvK-nummer:</p>
                <p className="text-gray-700">73304549</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900">BTW-identificatienummer:</p>
                <p className="text-gray-700">NL001198759B67</p>
              </div>
            </div>
          </div>
        </section>

        {/* Article 3 - Toepasselijkheid */}
        <section id="artikel-3" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 3 - Toepasselijkheid</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>Deze algemene voorwaarden zijn van toepassing op elk aanbod van de ondernemer en op elke tot stand gekomen overeenkomst op afstand tussen ondernemer en consument.</li>
            <li>Voordat de overeenkomst op afstand wordt gesloten, wordt de tekst van deze algemene voorwaarden aan de consument beschikbaar gesteld. Indien dit redelijkerwijs niet mogelijk is, zal voordat de overeenkomst op afstand wordt gesloten, worden aangegeven dat de algemene voorwaarden bij de ondernemer zijn in te zien en zij op verzoek van de consument zo spoedig mogelijk kosteloos worden toegezonden.</li>
            <li>Indien de overeenkomst op afstand elektronisch wordt gesloten, kan in afwijking van het vorige lid en voordat de overeenkomst op afstand wordt gesloten, de tekst van deze algemene voorwaarden langs elektronische weg aan de consument ter beschikking worden gesteld op zodanige wijze dat deze door de consument op een eenvoudige manier kan worden opgeslagen op een duurzame gegevensdrager. Indien dit redelijkerwijs niet mogelijk is, zal voordat de overeenkomst op afstand wordt gesloten, worden aangegeven waar van de algemene voorwaarden langs elektronische weg kan worden kennisgenomen en dat zij op verzoek van de consument langs elektronische weg of op andere wijze kosteloos zullen worden toegezonden.</li>
            <li>Voor het geval dat naast deze algemene voorwaarden tevens specifieke product- of dienstenvoorwaarden van toepassing zijn, is het tweede en derde lid van overeenkomstige toepassing en kan de consument zich in geval van tegenstrijdige algemene voorwaarden steeds beroepen op de toepasselijke bepaling die voor hem het meest gunstig is.</li>
          </ol>
        </section>

        {/* Article 4 - Het aanbod */}
        <section id="artikel-4" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 4 - Het aanbod</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>Indien een aanbod een beperkte geldigheidsduur heeft of onder voorwaarden geschiedt, wordt dit nadrukkelijk in het aanbod vermeld.</li>
            <li>Het aanbod bevat een volledige en nauwkeurige omschrijving van de aangeboden producten en/of diensten. De beschrijving is voldoende gedetailleerd om een goede beoordeling van het aanbod door de consument mogelijk te maken. Als de ondernemer gebruik maakt van afbeeldingen zijn deze een waarheidsgetrouwe weergave van de aangeboden producten en/of diensten. Kennelijke vergissingen of kennelijke fouten in het aanbod binden de ondernemer niet.</li>
            <li>Elk aanbod bevat zodanige informatie, dat voor de consument duidelijk is wat de rechten en verplichtingen zijn, die aan de aanvaarding van het aanbod zijn verbonden. Dit betreft in het bijzonder:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>de prijs inclusief belastingen;</li>
                <li>de eventuele kosten van aflevering;</li>
                <li>de wijze waarop de overeenkomst tot stand zal komen en welke handelingen daarvoor nodig zijn;</li>
                <li>het al dan niet van toepassing zijn van het herroepingsrecht;</li>
                <li>de wijze van betaling, aflevering en uitvoering van de overeenkomst;</li>
                <li>de termijn voor aanvaarding van het aanbod, dan wel de termijn waarbinnen de ondernemer de prijs garandeert;</li>
                <li>de hoogte van het tarief voor communicatie op afstand;</li>
                <li>of de overeenkomst na de totstandkoming wordt gearchiveerd;</li>
                <li>de manier waarop de consument gegevens kan controleren en herstellen;</li>
                <li>de eventuele andere talen waarin de overeenkomst kan worden gesloten;</li>
                <li>de gedragscodes waaraan de ondernemer zich heeft onderworpen;</li>
                <li>de minimale duur van de overeenkomst op afstand in geval van een duurtransactie.</li>
              </ul>
            </li>
          </ol>
        </section>

        {/* Article 5 - De overeenkomst */}
        <section id="artikel-5" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 5 - De overeenkomst</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>De overeenkomst komt, onder voorbehoud van het bepaalde in lid 4, tot stand op het moment van aanvaarding door de consument van het aanbod en het voldoen aan de daarbij gestelde voorwaarden.</li>
            <li>Indien de consument het aanbod langs elektronische weg heeft aanvaard, bevestigt de ondernemer onverwijld langs elektronische weg de ontvangst van de aanvaarding van het aanbod. Zolang de ontvangst van deze aanvaarding niet door de ondernemer is bevestigd, kan de consument de overeenkomst ontbinden.</li>
            <li>Indien de overeenkomst elektronisch tot stand komt, treft de ondernemer passende technische en organisatorische maatregelen ter beveiliging van de elektronische overdracht van data en zorgt hij voor een veilige web omgeving. Indien de consument elektronisch kan betalen, zal de ondernemer daartoe passende veiligheidsmaatregelen in acht nemen.</li>
            <li>De ondernemer kan zich - binnen wettelijke kaders - op de hoogte stellen of de consument aan zijn betalingsverplichtingen kan voldoen, alsmede van al die feiten en factoren die van belang zijn voor een verantwoord aangaan van de overeenkomst op afstand. Indien de ondernemer op grond van dit onderzoek goede gronden heeft om de overeenkomst niet aan te gaan, is hij gerechtigd gemotiveerd een bestelling of aanvraag te weigeren of aan de uitvoering bijzondere voorwaarden te verbinden.</li>
            <li>De ondernemer zal bij het product of dienst aan de consument de volgende informatie, schriftelijk of op zodanige wijze dat deze door de consument op een toegankelijke manier kan worden opgeslagen op een duurzame gegevensdrager, meesturen:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>het bezoekadres van de vestiging van de ondernemer waar de consument met klachten terecht kan;</li>
                <li>de voorwaarden waaronder en de wijze waarop de consument van het herroepingsrecht gebruik kan maken;</li>
                <li>de informatie over garanties en bestaande service na aankoop;</li>
                <li>de in artikel 4 lid 3 opgenomen gegevens;</li>
                <li>de vereisten voor opzegging van de overeenkomst indien de overeenkomst een duur heeft van meer dan een jaar.</li>
              </ul>
            </li>
            <li>In geval van een duurtransactie is de bepaling in het vorige lid slechts van toepassing op de eerste levering.</li>
          </ol>
        </section>

        {/* Article 6 - Herroepingsrecht */}
        <section id="artikel-6" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 6 - Herroepingsrecht</h2>
          <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-400 mb-6">
            <h3 className="font-semibold text-green-800 text-lg mb-2">14 dagen bedenktijd</h3>
            <p className="text-green-700">Bij de aankoop van producten heeft de consument de mogelijkheid de overeenkomst zonder opgave van redenen te ontbinden gedurende 14 dagen.</p>
          </div>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>Bij de aankoop van producten heeft de consument de mogelijkheid de overeenkomst zonder opgave van redenen te ontbinden gedurende 14 dagen. Deze bedenktermijn gaat in op de dag na ontvangst van het product door de consument of een vooraf door de consument aangewezen en aan de ondernemer bekend gemaakte vertegenwoordiger.</li>
            <li>Tijdens de bedenktijd zal de consument zorgvuldig omgaan met het product en de verpakking. Hij zal het product slechts in die mate uitpakken of gebruiken voor zover dat nodig is om te kunnen beoordelen of hij het product wenst te behouden. Indien hij van zijn herroepingsrecht gebruik maakt, zal hij het product met alle geleverde toebehoren en - indien redelijkerwijze mogelijk - in de originele staat en verpakking aan de ondernemer retourneren, conform de door de ondernemer verstrekte redelijke en duidelijke instructies.</li>
          </ol>
        </section>

        {/* Article 7 - Kosten herroeping */}
        <section id="artikel-7" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 7 - Kosten in geval van herroeping</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>Indien de consument gebruik maakt van zijn herroepingsrecht, komen ten hoogste de kosten van terugzending voor zijn rekening.</li>
            <li>Indien de consument een bedrag betaald heeft, zal de ondernemer dit bedrag zo spoedig mogelijk, doch uiterlijk binnen 30 dagen na de terugzending of herroeping, terugbetalen.</li>
          </ol>
        </section>

        {/* Article 8 - Uitsluiting herroepingsrecht */}
        <section id="artikel-8" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 8 - Uitsluiting herroepingsrecht</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>De ondernemer kan het herroepingsrecht van de consument uitsluiten voor zover voorzien in lid 2 en 3. De uitsluiting van het herroepingsrecht geldt slechts indien de ondernemer dit duidelijk in het aanbod, althans tijdig voor het sluiten van de overeenkomst, heeft vermeld.</li>
            <li>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 mb-4">
                <h4 className="font-semibold text-red-800 mb-3">Uitsluiting herroepingsrecht voor producten:</h4>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>die door de ondernemer tot stand zijn gebracht overeenkomstig specificaties van de consument;</li>
                  <li>die duidelijk persoonlijk van aard zijn;</li>
                  <li>die door hun aard niet kunnen worden teruggezonden, zoals gebruikte erotische artikelen en gedragen lingerie;</li>
                  <li>die snel kunnen bederven of verouderen;</li>
                  <li>waarvan de prijs gebonden is aan schommelingen op de financiële markt;</li>
                  <li>voor losse kranten en tijdschriften;</li>
                  <li>voor audio- en video-opnamen en computersoftware waarvan de consument de verzegeling heeft verbroken.</li>
                </ul>
              </div>
            </li>
            <li>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                <h4 className="font-semibold text-red-800 mb-3">Uitsluiting herroepingsrecht voor diensten:</h4>
                <ul className="list-disc list-inside space-y-1 text-red-700">
                  <li>betreffende logies, vervoer, restaurantbedrijf of vrijetijdsbesteding te verrichten op een bepaalde datum;</li>
                  <li>waarvan de levering met uitdrukkelijke instemming van de consument is begonnen voordat de bedenktijd is verstreken;</li>
                  <li>betreffende weddenschappen en loterijen.</li>
                </ul>
              </div>
            </li>
          </ol>
        </section>

        {/* Article 9 - De prijs */}
        <section id="artikel-9" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 9 - De prijs</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>Gedurende de in het aanbod vermelde geldigheidsduur worden de prijzen van de aangeboden producten en/of diensten niet verhoogd, behoudens prijswijzigingen als gevolg van veranderingen in btw-tarieven.</li>
            <li>In afwijking van het vorige lid kan de ondernemer producten of diensten waarvan de prijzen gebonden zijn aan schommelingen op de financiële markt en waar de ondernemer geen invloed op heeft, met variabele prijzen aanbieden. Deze gebondenheid aan schommelingen en het feit dat eventueel vermelde prijzen richtprijzen zijn, worden bij het aanbod vermeld.</li>
            <li>Prijsverhogingen binnen 3 maanden na de totstandkoming van de overeenkomst zijn alleen toegestaan indien zij het gevolg zijn van wettelijke regelingen of bepalingen.</li>
            <li>Prijsverhogingen vanaf 3 maanden na de totstandkoming van de overeenkomst zijn alleen toegestaan indien de ondernemer dit bedongen heeft en:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>deze het gevolg zijn van wettelijke regelingen of bepalingen; of</li>
                <li>de consument de bevoegdheid heeft de overeenkomst op te zeggen met ingang van de dag waarop de prijsverhoging ingaat.</li>
              </ul>
            </li>
            <li>De in het aanbod van producten of diensten genoemde prijzen zijn inclusief btw.</li>
          </ol>
        </section>

        {/* Article 10 - Conformiteit en Garantie */}
        <section id="artikel-10" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 10 - Conformiteit en Garantie</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>De ondernemer staat er voor in dat de producten en/of diensten voldoen aan de overeenkomst, de in het aanbod vermelde specificaties, aan de redelijke eisen van deugdelijkheid en/of bruikbaarheid en de op de datum van de totstandkoming van de overeenkomst bestaande wettelijke bepalingen en/of overheidsvoorschriften. Indien overeengekomen staat de ondernemer er tevens voor in dat het product geschikt is voor ander dan normaal gebruik.</li>
            <li>Een door de ondernemer, fabrikant of importeur verstrekte garantie doet niets af aan de wettelijke rechten en vorderingen die de consument op grond van de overeenkomst tegenover de ondernemer kan doen gelden.</li>
          </ol>
        </section>

        {/* Article 11 - Levering en uitvoering */}
        <section id="artikel-11" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 11 - Levering en uitvoering</h2>
          <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-400 mb-6">
            <h3 className="font-semibold text-blue-800 text-lg mb-2">Leveringstermijn: maximaal 30 dagen</h3>
            <p className="text-blue-700">Bestellingen worden uitgevoerd met bekwame spoed, doch uiterlijk binnen 30 dagen, tenzij een langere leveringstermijn is afgesproken.</p>
          </div>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>De ondernemer zal de grootst mogelijke zorgvuldigheid in acht nemen bij het in ontvangst nemen en bij de uitvoering van bestellingen van producten en bij de beoordeling van aanvragen tot verlening van diensten.</li>
            <li>Als plaats van levering geldt het adres dat de consument aan het bedrijf kenbaar heeft gemaakt.</li>
            <li>Met inachtneming van hetgeen hierover in artikel 4 van deze algemene voorwaarden is vermeld, zal het bedrijf geaccepteerde bestellingen met bekwame spoed doch uiterlijk binnen 30 dagen uitvoeren tenzij een langere leveringstermijn is afgesproken. Indien de bezorging vertraging ondervindt, of indien een bestelling niet dan wel slechts gedeeltelijk kan worden uitgevoerd, ontvangt de consument hiervan uiterlijk 30 dagen nadat hij de bestelling geplaatst heeft bericht. De consument heeft in dat geval het recht om de overeenkomst zonder kosten te ontbinden en recht op eventuele schadevergoeding.</li>
            <li>In geval van ontbinding conform het vorige lid zal de ondernemer het bedrag dat de consument betaald heeft zo spoedig mogelijk, doch uiterlijk binnen 30 dagen na ontbinding, terugbetalen.</li>
            <li>Indien levering van een besteld product onmogelijk blijkt te zijn, zal de ondernemer zich inspannen om een vervangend artikel beschikbaar te stellen. Uiterlijk bij de bezorging zal op duidelijke en begrijpelijke wijze worden gemeld dat een vervangend artikel wordt geleverd. Bij vervangende artikelen kan het herroepingsrecht niet worden uitgesloten. De kosten van een eventuele retourzending zijn voor rekening van de ondernemer.</li>
            <li>Het risico van beschadiging en/of vermissing van producten berust bij de ondernemer tot het moment van bezorging aan de consument of een vooraf aangewezen en aan de ondernemer bekend gemaakte vertegenwoordiger, tenzij uitdrukkelijk anders is overeengekomen.</li>
          </ol>
        </section>

        {/* Article 12 - Duurtransacties */}
        <section id="artikel-12" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 12 - Duurtransacties: duur, opzegging en verlenging</h2>
          
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Opzegging</h3>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed mb-6">
            <li>De consument kan een overeenkomst die voor onbepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van producten (elektriciteit daaronder begrepen) of diensten, te allen tijde opzeggen met inachtneming van daartoe overeengekomen opzeggingsregels en een opzegtermijn van ten hoogste één maand.</li>
            <li>De consument kan een overeenkomst die voor bepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van producten (elektriciteit daaronder begrepen) of diensten, te allen tijde tegen het einde van de bepaalde duur opzeggen met inachtneming van daartoe overeengekomen opzeggingsregels en een opzegtermijn van ten hoogste één maand.</li>
            <li>De consument kan de in de vorige leden genoemde overeenkomsten:
              <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                <li>te allen tijde opzeggen en niet beperkt worden tot opzegging op een bepaald tijdstip of in een bepaalde periode;</li>
                <li>tenminste opzeggen op dezelfde wijze als zij door hem zijn aangegaan;</li>
                <li>altijd opzeggen met dezelfde opzegtermijn als de ondernemer voor zichzelf heeft bedongen.</li>
              </ul>
            </li>
          </ol>

          <h3 className="text-lg font-semibold mb-4 text-gray-900">Verlenging</h3>
        
            <li>Een overeenkomst die voor bepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van producten (elektriciteit daaronder begrepen) of diensten, mag niet stilzwijgend worden verlengd of vernieuwd voor een bepaalde duur.</li>
            <li>In afwijking van het vorige lid mag een overeenkomst die voor bepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van dag- nieuws- en weekbladen en tijdschriften stilzwijgend worden verlengd voor een bepaalde duur van maximaal drie maanden, als de consument deze verlengde overeenkomst tegen het einde van de verlenging kan opzeggen met een opzegtermijn van ten hoogste één maand.</li>
            <li>Een overeenkomst die voor bepaalde tijd is aangegaan en die strekt tot het geregeld afleveren van producten of diensten, mag alleen stilzwijgend voor onbepaalde duur worden verlengd als de consument te allen tijde mag opzeggen met een opzegtermijn van ten hoogste één maand en een opzegtermijn van ten hoogste drie maanden in geval de overeenkomst strekt tot het geregeld, maar minder dan eenmaal per maand, afleveren van dag-, nieuws- en weekbladen en tijdschriften.</li>
            <li>Een overeenkomst met beperkte duur tot het geregeld ter kennismaking afleveren van dag-, nieuws- en weekbladen en tijdschriften (proef- of kennismakingsabonnement) wordt niet stilzwijgend voortgezet en eindigt automatisch na afloop van de proef- of kennismakingsperiode.</li>

          <h3 className="text-lg font-semibold mb-4 text-gray-900">Duur</h3>
          
            <li>Als een overeenkomst een duur van meer dan een jaar heeft, mag de consument na een jaar de overeenkomst te allen tijde met een opzegtermijn van ten hoogste een maand opzeggen, tenzij de redelijkheid en billijkheid zich tegen opzegging vóór het einde van de overeengekomen duur verzetten.</li>
        </section>

        {/* Article 13 - Betaling */}
        <section id="artikel-13" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 13 - Betaling</h2>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>Voor zover niet anders is overeengekomen, dienen de door de consument verschuldigde bedragen te worden voldaan binnen 14 dagen na het ingaan van de bedenktermijn als bedoeld in artikel 6 lid 1. In geval van een overeenkomst tot het verlenen van een dienst, vangt deze termijn aan nadat de consument de bevestiging van de overeenkomst heeft ontvangen.</li>
            <li>Bij de verkoop van producten aan consumenten mag in algemene voorwaarden nimmer een vooruitbetaling van meer dan 50% worden bedongen. Wanneer vooruitbetaling is bedongen, kan de consument geen enkel recht doen gelden aangaande de uitvoering van de desbetreffende bestelling of dienst(en), alvorens de bedongen vooruitbetaling heeft plaatsgevonden.</li>
            <li>De consument heeft de plicht om onjuistheden in verstrekte of vermelde betaalgegevens onverwijld aan de ondernemer te melden.</li>
            <li>In geval van wanbetaling van de consument heeft de ondernemer behoudens wettelijke beperkingen, het recht om de vooraf aan de consument kenbaar gemaakte redelijke kosten in rekening te brengen.</li>
          </ol>
        </section>

        {/* Article 14 - Klachtenregeling */}
        <section id="artikel-14" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 14 - Klachtenregeling</h2>
          <div className="bg-yellow-50 p-6 rounded-lg border-l-4 border-yellow-400 mb-6">
            <h3 className="font-semibold text-yellow-800 text-lg mb-2">Reactietijd klachten: 14 dagen</h3>
            <p className="text-yellow-700">Klachten worden binnen 14 dagen na ontvangst beantwoord. Bij langere verwerkingstijd ontvangt u binnen 14 dagen een ontvangstbevestiging.</p>
          </div>
          <ol className="list-decimal list-inside space-y-4 text-gray-700 leading-relaxed">
            <li>De ondernemer beschikt over een voldoende bekend gemaakte klachtenprocedure en behandelt de klacht overeenkomstig deze klachtenprocedure.</li>
            <li>Klachten over de uitvoering van de overeenkomst moeten binnen bekwame tijd, volledig en duidelijk omschreven worden ingediend bij de ondernemer, nadat de consument de gebreken heeft geconstateerd.</li>
            <li>Bij de ondernemer ingediende klachten worden binnen een termijn van 14 dagen gerekend vanaf de datum van ontvangst beantwoord. Als een klacht een voorzienbaar langere verwerkingstijd vraagt, wordt door de ondernemer binnen de termijn van 14 dagen geantwoord met een bericht van ontvangst en een indicatie wanneer de consument een meer uitvoerig antwoord kan verwachten.</li>
            <li>Indien de klacht niet in onderling overleg kan worden opgelost ontstaat een geschil dat vatbaar is voor de geschillenregeling.</li>
          </ol>
        </section>

        {/* Article 15 - Geschillen */}
        <section id="artikel-15" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 15 - Geschillen</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 font-medium">Op overeenkomsten tussen de ondernemer en de consument waarop deze algemene voorwaarden betrekking hebben, is uitsluitend Nederlands recht van toepassing.</p>
          </div>
        </section>

        {/* Article 16 - Aanvullende bepalingen */}
        <section id="artikel-16" className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Artikel 16 - Aanvullende of afwijkende bepalingen</h2>
          <p className="text-gray-700 leading-relaxed">Aanvullende dan wel van deze algemene voorwaarden afwijkende bepalingen mogen niet ten nadele van de consument zijn en dienen schriftelijk te worden vastgelegd dan wel op zodanige wijze dat deze door de consument op een toegankelijke manier kunnen worden opgeslagen op een duurzame gegevensdrager.</p>
        </section>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact</h3>
            <p className="text-gray-600 mb-4">Voor vragen over deze algemene voorwaarden kunt u contact opnemen:</p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2 text-gray-700">
                <Mail size={18} className="text-blue-600" />
                <span>Onlineproducts202323@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-700">
                <Phone size={18} className="text-blue-600" />
                <span>0648582729</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Deze algemene voorwaarden zijn opgesteld conform de Nederlandse wetgeving
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;