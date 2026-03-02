import type { Metadata } from 'next'
import BrandPageClient from './BrandPageClient'

interface Props {
    params: Promise<{ slug: string }>
}

// ─── Brand-specific SEO data ────────────────────────────────────────────────
const brandMeta: Record<string, { name: string; description: string; faq: Array<{ q: string; a: string }> }> = {
    'mercedes-benz': {
        name: 'Mercedes-Benz',
        description: 'Expert Mercedes-Benz service & repair in Musaffah M9, Abu Dhabi. AMG-trained technicians, genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does a Mercedes-Benz service cost in Abu Dhabi?', a: 'Mercedes-Benz service at Smart Motor starts from AED 1,200 for a major service. Final pricing depends on the model and service required. Contact us for a free quote.' },
            { q: 'Does servicing my Mercedes at an independent garage void the warranty in UAE?', a: 'No. Under UAE consumer protection law, servicing at a qualified independent workshop using genuine or equivalent parts does not void your Mercedes-Benz warranty.' },
            { q: 'Where is Smart Motor located for Mercedes service in Abu Dhabi?', a: 'Smart Motor is located in Musaffah Industrial Area, M9, Abu Dhabi — the hub for specialist automotive workshops in the emirate.' },
            { q: 'Do you use genuine Mercedes-Benz parts?', a: 'Yes. We use OEM and genuine Mercedes-Benz parts for all servicing and repairs, ensuring your vehicle maintains factory specifications.' },
            { q: 'Can you service AMG and S-Class Mercedes models?', a: 'Absolutely. Our technicians are trained on the full Mercedes-Benz range including AMG performance models and the flagship S-Class and G-Wagon.' },
        ],
    },
    'bmw': {
        name: 'BMW',
        description: 'Specialist BMW service & repair in Musaffah M9, Abu Dhabi. M-Sport diagnostics, genuine parts, 6-month warranty. Book online.',
        faq: [
            { q: 'How much does a BMW service cost in Abu Dhabi?', a: 'BMW service at Smart Motor starts from AED 1,200 for a major service. We provide competitive pricing with genuine parts and certified technicians.' },
            { q: 'Do you service BMW M-Series cars in Abu Dhabi?', a: 'Yes. Our technicians are trained on all BMW models including M3, M5, and M8 Competition with performance-grade calibration.' },
            { q: 'Where can I get my BMW serviced in Musaffah?', a: 'Smart Motor is located in Musaffah Industrial Area, M9, Abu Dhabi. We are a specialist BMW independent workshop serving all Abu Dhabi areas.' },
            { q: 'Is independent BMW service cheaper than the dealer in UAE?', a: 'Independent specialist service typically offers savings of 20–40% compared to main dealer pricing, using the same genuine parts and diagnostic tools.' },
            { q: 'Do you carry out BMW transmission and gearbox repairs?', a: 'Yes. We specialise in BMW ZF automatic gearbox repair, mechatronic unit replacement, and DCT (dual-clutch) service for all BMW models.' },
        ],
    },
    'audi': {
        name: 'Audi',
        description: 'Expert Audi service & repair in Musaffah M9, Abu Dhabi. Quattro & TFSI specialists, genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Audi service cost in Abu Dhabi?', a: 'Audi service at Smart Motor starts from AED 1,200 for a full inspection service. Cost varies by model — contact us for a free quote.' },
            { q: 'Do you service Audi Quattro and RS models?', a: 'Yes. We have specialist knowledge of Audi Quattro all-wheel drive systems, TFSI engines, and RS performance models including the RS6 and R8.' },
            { q: 'Where is your Audi workshop in Abu Dhabi?', a: 'We are located in Musaffah Industrial Area, M9, Abu Dhabi — the centre of specialist automotive care in the emirate.' },
            { q: 'Can independent Audi service void my warranty in UAE?', a: 'No. UAE consumer regulations protect your right to use a qualified independent workshop without voiding your Audi manufacturer warranty.' },
            { q: 'Do you offer Audi DSG gearbox service?', a: 'Yes. We carry out DSG (Direct Shift Gearbox) oil changes, mechatronic repairs, and full DSG rebuilds for all Audi models.' },
        ],
    },
    'porsche': {
        name: 'Porsche',
        description: 'Specialist Porsche service & repair in Musaffah M9, Abu Dhabi. Factory-level diagnostics, genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Porsche service cost in Abu Dhabi?', a: 'Porsche service at Smart Motor starts from AED 1,200. We offer competitive pricing with the same quality as main dealer service. Contact us for a model-specific quote.' },
            { q: 'Do you service Porsche Taycan electric vehicles?', a: 'Yes. We are equipped with Porsche-compatible diagnostic tools for the Taycan EV platform as well as all combustion-engine Porsche models.' },
            { q: 'Where is your Porsche workshop in Abu Dhabi?', a: 'Smart Motor is at Musaffah Industrial Area, M9, Abu Dhabi. We are one of Abu Dhabi\'s leading independent Porsche specialists.' },
            { q: 'Can you repair a Porsche PDK gearbox in Abu Dhabi?', a: 'Yes. We perform Porsche PDK (dual-clutch) gearbox servicing, software calibration, and full rebuild where required.' },
            { q: 'Do independent Porsche workshops use genuine parts?', a: 'Smart Motor uses OEM and genuine Porsche parts to ensure your vehicle maintains factory performance and warranty compliance.' },
        ],
    },
    'land-rover': {
        name: 'Land Rover',
        description: 'Expert Land Rover & Range Rover service in Musaffah M9, Abu Dhabi. Air suspension specialists, genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Range Rover service cost in Abu Dhabi?', a: 'Land Rover and Range Rover service at Smart Motor starts from AED 1,200. Air suspension and Terrain Response repairs are quoted separately. Contact us for a free estimate.' },
            { q: 'Do you repair Land Rover air suspension in Abu Dhabi?', a: 'Yes. Air suspension repair and replacement is one of our core Land Rover specialisms, covering all Range Rover, Defender, and Discovery models.' },
            { q: 'Where is your Land Rover workshop in Abu Dhabi?', a: 'Smart Motor is located in Musaffah Industrial Area, M9, Abu Dhabi — a specialist European and British vehicle workshop serving the whole emirate.' },
            { q: 'Can you service a Range Rover Defender in Musaffah?', a: 'Yes. We service all Land Rover Defender generations (TD5, TDV6, and the new L663 series) alongside Range Rover Sport, Discovery, Velar, and Evoque.' },
            { q: 'Is Smart Motor Land Rover service cheaper than the dealer?', a: 'Independent specialist workshops typically offer 20–40% savings over main dealer pricing for Land Rover and Range Rover service, using equivalent parts and diagnostic technology.' },
        ],
    },
    'toyota': {
        name: 'Toyota',
        description: 'Professional Toyota service & repair in Musaffah M9, Abu Dhabi. Land Cruiser, Camry & Prado specialists with genuine parts and 6-month warranty.',
        faq: [
            { q: 'How much does Toyota service cost in Abu Dhabi?', a: 'Toyota service at Smart Motor starts from AED 500 for a minor service and AED 1,200 for a major service. Land Cruiser and Prado pricing may vary — contact us for a free quote.' },
            { q: 'Do you service Toyota Land Cruiser V8 in Abu Dhabi?', a: 'Yes. We are Land Cruiser specialists handling V8 engine overhauls, suspension upgrades, transmission service, and full electrical diagnostics for all Land Cruiser generations.' },
            { q: 'Can you service Toyota hybrid vehicles in Musaffah?', a: 'Yes. Our technicians are trained on Toyota Hybrid Synergy Drive systems including Camry Hybrid, RAV4 Hybrid, and Corolla Hybrid battery and powertrain servicing.' },
            { q: 'Where is Smart Motor for Toyota service in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We serve Toyota owners across Abu Dhabi, Al Ain, and the Western Region.' },
            { q: 'Is independent Toyota service as good as the dealer?', a: 'Yes. Smart Motor uses genuine Toyota parts and OEM-grade diagnostic tools. Independent servicing saves you 20–40% versus dealer pricing with no compromise on quality.' },
        ],
    },
    'nissan': {
        name: 'Nissan',
        description: 'Specialist Nissan service & repair in Musaffah M9, Abu Dhabi. Patrol, Altima & X-Trail experts with genuine parts and 6-month warranty.',
        faq: [
            { q: 'How much does Nissan Patrol service cost in Abu Dhabi?', a: 'Nissan Patrol service at Smart Motor starts from AED 800 for a standard service. V8 Patrol models may require additional attention — contact us for a model-specific quote.' },
            { q: 'Do you service Nissan CVT transmissions in Abu Dhabi?', a: 'Yes. We specialise in Nissan Xtronic CVT diagnosis, fluid changes, and valve body repairs for Altima, X-Trail, Pathfinder, and other CVT-equipped models.' },
            { q: 'Can you service a Nissan GT-R in Musaffah?', a: 'Yes. Our performance specialists handle GT-R VR38DETT twin-turbo V6 servicing, DCT transmission fluid changes, and ATTESA E-TS AWD system calibration.' },
            { q: 'Where is Smart Motor for Nissan service?', a: 'We are located at M9, Musaffah Industrial Area, Abu Dhabi. We are one of the leading independent Nissan workshops in the emirate.' },
            { q: 'Do you use genuine Nissan parts?', a: 'Yes. Smart Motor uses OEM and genuine Nissan parts for all services and repairs, ensuring factory-grade reliability and warranty compliance.' },
        ],
    },
    'lexus': {
        name: 'Lexus',
        description: 'Expert Lexus service & repair in Musaffah M9, Abu Dhabi. Hybrid powertrain specialists with genuine parts and 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Lexus service cost in Abu Dhabi?', a: 'Lexus service at Smart Motor starts from AED 1,000. Hybrid models and the LX flagship may vary — contact us for a model-specific estimate.' },
            { q: 'Do you service Lexus hybrid vehicles in Abu Dhabi?', a: 'Yes. Our technicians are certified on Lexus hybrid powertrain systems including the ES Hybrid, RX Hybrid, and LS Hybrid battery and motor servicing.' },
            { q: 'Can you service a Lexus LX 600 in Musaffah?', a: 'Yes. We handle full LX 600 servicing including twin-turbo V6 engine care, Adaptive Variable Suspension calibration, and Multi-Terrain Select diagnostics.' },
            { q: 'Where is your Lexus workshop in Abu Dhabi?', a: 'Smart Motor is at Musaffah Industrial Area, M9, Abu Dhabi — serving Lexus owners from across the emirate with premium independent care.' },
            { q: 'Is independent Lexus service cheaper than Al-Futtaim?', a: 'Yes. Independent specialist service typically saves 25–40% compared to authorized dealer pricing while using the same quality genuine parts and diagnostic equipment.' },
        ],
    },
    'lamborghini': {
        name: 'Lamborghini',
        description: 'Specialist Lamborghini service & repair in Musaffah M9, Abu Dhabi. Huracan, Urus & Aventador experts with genuine parts. Book today.',
        faq: [
            { q: 'How much does Lamborghini service cost in Abu Dhabi?', a: 'Lamborghini annual service at Smart Motor is competitively priced versus authorized dealers. Huracan, Urus, and Aventador pricing varies by model — contact us for a bespoke quote.' },
            { q: 'Do you service Lamborghini Urus in Abu Dhabi?', a: 'Yes. We handle full Urus servicing including twin-turbo V8 engine care, air suspension calibration, carbon ceramic brake service, and Anima drive mode diagnostics.' },
            { q: 'Can you service a Lamborghini Huracan in Musaffah?', a: 'Yes. Our supercar specialists handle Huracan V10 engine servicing, LDF dual-clutch gearbox fluid changes, and full electronic systems diagnostics.' },
            { q: 'Where is Smart Motor for Lamborghini service?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We provide a premium, discreet service experience for supercar owners.' },
            { q: 'Do you use genuine Lamborghini parts?', a: 'Yes. We source OEM and genuine Lamborghini parts to maintain factory specifications, performance, and resale value.' },
        ],
    },
    'rolls-royce': {
        name: 'Rolls-Royce',
        description: 'Specialist Rolls-Royce service & repair in Musaffah M9, Abu Dhabi. Ghost, Phantom & Cullinan experts with genuine parts. Book today.',
        faq: [
            { q: 'How much does Rolls-Royce service cost in Abu Dhabi?', a: 'Rolls-Royce annual service at Smart Motor is significantly more affordable than authorized dealer pricing while maintaining the same exacting standards. Contact us for a confidential quote.' },
            { q: 'Do you service Rolls-Royce Cullinan in Abu Dhabi?', a: 'Yes. We handle full Cullinan servicing including V12 engine care, self-leveling air suspension, Flagbearer camera system calibration, and bespoke interior maintenance.' },
            { q: 'Can independent workshops service Rolls-Royce in UAE?', a: 'Yes. UAE consumer law permits independent servicing with genuine parts. Smart Motor provides Rolls-Royce-quality care with full electronic diagnostic capability.' },
            { q: 'Where is Smart Motor for Rolls-Royce service?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We offer collection and delivery service for Rolls-Royce owners.' },
            { q: 'Do you handle Rolls-Royce electrical systems?', a: 'Yes. Our technicians can diagnose and repair all Rolls-Royce electronic systems including Starlight Headliner, Spirit of Ecstasy mechanism, and GHOST architecture.' },
        ],
    },
    'bentley': {
        name: 'Bentley',
        description: 'Expert Bentley service & repair in Musaffah M9, Abu Dhabi. Continental GT, Bentayga & Flying Spur specialists. Genuine parts, 6-month warranty.',
        faq: [
            { q: 'How much does Bentley service cost in Abu Dhabi?', a: 'Bentley service at Smart Motor offers premium care at competitive independent pricing. Continental GT, Bentayga, and Flying Spur service costs vary — contact us for a bespoke estimate.' },
            { q: 'Do you service Bentley W12 engines in Abu Dhabi?', a: 'Yes. Our technicians specialise in Bentley W12 twin-turbo engines, including oil service, turbocharger inspection, and engine management diagnostics.' },
            { q: 'Can you service Bentley air suspension in Musaffah?', a: 'Yes. We handle full Bentley air suspension diagnostics, air spring replacement, and ride height calibration for Bentayga, Continental GT, and Flying Spur.' },
            { q: 'Where is your Bentley workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We provide a premium workshop environment for Bentley owners.' },
            { q: 'Is independent Bentley service reliable in UAE?', a: 'Absolutely. Smart Motor uses genuine Bentley parts and factory-compatible diagnostic tools. UAE law protects your right to independent servicing without warranty implications.' },
        ],
    },
    'ferrari': {
        name: 'Ferrari',
        description: 'Specialist Ferrari service & repair in Musaffah M9, Abu Dhabi. Factory-level diagnostics for 488, F8, Roma, SF90. Genuine parts. Book today.',
        faq: [
            { q: 'How much does Ferrari service cost in Abu Dhabi?', a: 'Ferrari annual service at Smart Motor is competitively priced versus authorized dealers. Pricing varies by model and service scope — contact us for a confidential quote.' },
            { q: 'Do you service Ferrari F1 dual-clutch gearboxes?', a: 'Yes. Our technicians handle Ferrari F1 DCT gearbox fluid changes, clutch wear assessment, and calibration for 488, F8, Roma, and SF90 Stradale.' },
            { q: 'Can you service a Ferrari in Musaffah?', a: 'Yes. Smart Motor at M9, Musaffah has the diagnostic equipment and trained technicians required for full Ferrari servicing and repair.' },
            { q: 'Do you use genuine Ferrari parts?', a: 'Yes. We use OEM and genuine Ferrari parts to maintain factory performance, safety, and resale value of your vehicle.' },
            { q: 'Where is Smart Motor for Ferrari service in Abu Dhabi?', a: 'We are at M9, Musaffah Industrial Area, Abu Dhabi. Discreet collection and delivery is available for supercar owners.' },
        ],
    },
    'volkswagen': {
        name: 'Volkswagen',
        description: 'Professional Volkswagen service & repair in Musaffah M9, Abu Dhabi. TSI & DSG specialists with genuine parts. 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Volkswagen service cost in Abu Dhabi?', a: 'VW service at Smart Motor starts from AED 500 for a minor service. Touareg and performance models may vary — contact us for a free quote.' },
            { q: 'Do you service VW DSG gearboxes in Abu Dhabi?', a: 'Yes. We perform DSG dual-clutch gearbox fluid changes, mechatronic repairs, and clutch pack replacement for all VW models including Golf, Tiguan, and Passat.' },
            { q: 'Can you service a Volkswagen Touareg in Musaffah?', a: 'Yes. We handle full Touareg servicing including V6/V8 TDI engines, air suspension, 4MOTION AWD diagnostics, and Innovision cockpit electronics.' },
            { q: 'Where is your VW workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We are a specialist German vehicle workshop serving the full VW range.' },
            { q: 'Is independent VW service as good as the dealer?', a: 'Yes. We use genuine VW parts and ODIS-compatible diagnostic software — the same tools used in authorized VW service centres, at independent pricing.' },
        ],
    },
    'ford': {
        name: 'Ford',
        description: 'Expert Ford service & repair in Musaffah M9, Abu Dhabi. Explorer, Mustang & Raptor specialists with genuine parts. 6-month warranty.',
        faq: [
            { q: 'How much does Ford service cost in Abu Dhabi?', a: 'Ford service at Smart Motor starts from AED 500. Explorer, Mustang, and F-150 Raptor pricing varies by model — contact us for a free estimate.' },
            { q: 'Do you service Ford EcoBoost engines in Abu Dhabi?', a: 'Yes. Our technicians are trained on all Ford EcoBoost turbo engines including the 2.3L in Mustang, 2.7L and 3.5L in Explorer, and 3.5L HO in Raptor.' },
            { q: 'Can you service a Ford F-150 Raptor in Musaffah?', a: 'Yes. We handle full Raptor servicing including 3.5L EcoBoost HO engine care, FOX suspension service, and Terrain Management System diagnostics.' },
            { q: 'Where is your Ford workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We service all Ford models from the full-size Expedition to the Mustang.' },
            { q: 'Do you use genuine Ford parts?', a: 'Yes. We stock genuine Ford and Motorcraft parts for all service and repair work, maintaining factory reliability and warranty compliance.' },
        ],
    },
    'hyundai': {
        name: 'Hyundai',
        description: 'Professional Hyundai service & repair in Musaffah M9, Abu Dhabi. Tucson, Santa Fe & Sonata specialists. Genuine parts, 6-month warranty.',
        faq: [
            { q: 'How much does Hyundai service cost in Abu Dhabi?', a: 'Hyundai service at Smart Motor starts from AED 400 for a minor service. Contact us for model-specific pricing on Tucson, Santa Fe, and Palisade.' },
            { q: 'Do you service Hyundai turbo engines in Abu Dhabi?', a: 'Yes. We handle all Hyundai GDi and T-GDi turbo engine servicing including carbon cleaning, injector service, and turbocharger inspection.' },
            { q: 'Can you service Hyundai SmartSense ADAS in Musaffah?', a: 'Yes. Our technicians can calibrate Hyundai SmartSense systems including Forward Collision-Avoidance, Lane Following, and Blind-Spot Detection after repairs.' },
            { q: 'Where is Smart Motor for Hyundai service?', a: 'We are at M9, Musaffah Industrial Area, Abu Dhabi — an accessible location for Hyundai owners across the emirate.' },
            { q: 'Is independent Hyundai service cheaper than the dealer?', a: 'Yes. Smart Motor offers 20–35% savings on Hyundai servicing compared to authorized dealer pricing, using genuine parts and modern diagnostic tools.' },
        ],
    },
    'kia': {
        name: 'Kia',
        description: 'Expert Kia service & repair in Musaffah M9, Abu Dhabi. Telluride, Sportage & Sorento specialists. Genuine parts, 6-month warranty.',
        faq: [
            { q: 'How much does Kia service cost in Abu Dhabi?', a: 'Kia service at Smart Motor starts from AED 400. Telluride, Sorento, and Carnival pricing depends on engine type — contact us for a free quote.' },
            { q: 'Do you service Kia DCT transmissions in Abu Dhabi?', a: 'Yes. We handle Kia dual-clutch transmission fluid changes, clutch actuator repairs, and TCM calibration for Sportage, Seltos, and other DCT-equipped models.' },
            { q: 'Can you service a Kia EV6 in Musaffah?', a: 'Yes. Our technicians are trained on Kia E-GMP electric platform maintenance including battery health checks, thermal management, and regenerative braking calibration.' },
            { q: 'Where is your Kia workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We service the full Kia range with genuine parts and warranty-safe procedures.' },
            { q: 'Is independent Kia service recommended?', a: 'Yes. UAE consumer law protects your right to use qualified independent workshops. Smart Motor provides dealer-equivalent service at more competitive pricing.' },
        ],
    },
    'chevrolet': {
        name: 'Chevrolet',
        description: 'Professional Chevrolet service & repair in Musaffah M9, Abu Dhabi. Tahoe, Suburban & Corvette specialists. Genuine parts, 6-month warranty.',
        faq: [
            { q: 'How much does Chevrolet Tahoe service cost in Abu Dhabi?', a: 'Chevrolet Tahoe service at Smart Motor starts from AED 600 for a standard service. V8 models with Magnetic Ride Control may require additional checks — contact us for a free estimate.' },
            { q: 'Do you service Chevrolet V8 engines in Abu Dhabi?', a: 'Yes. Our technicians handle all GM small-block and LS/LT V8 engine servicing including Tahoe, Suburban, Silverado, Camaro, and Corvette models.' },
            { q: 'Can you service a Corvette in Musaffah?', a: 'Yes. We provide Corvette C7 and C8 servicing including dry-sump oil changes, Magnetic Ride Control diagnostics, and performance exhaust system maintenance.' },
            { q: 'Where is Smart Motor for Chevrolet service?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We serve Chevrolet owners across the emirate.' },
            { q: 'Do you use genuine Chevrolet parts?', a: 'Yes. We use genuine GM/AC Delco parts for all Chevrolet service and repair work, maintaining factory performance and warranty compliance.' },
        ],
    },
    'gmc': {
        name: 'GMC',
        description: 'Specialist GMC service & repair in Musaffah M9, Abu Dhabi. Yukon Denali & Sierra experts with genuine parts. 6-month warranty. Book today.',
        faq: [
            { q: 'How much does GMC Yukon Denali service cost in Abu Dhabi?', a: 'GMC Yukon Denali service at Smart Motor starts from AED 700. Pricing varies by engine type and service scope — contact us for a model-specific estimate.' },
            { q: 'Do you service GMC Duramax diesel engines in Abu Dhabi?', a: 'Yes. Our diesel specialists handle full Duramax engine servicing including diesel particulate filter regeneration, DEF system maintenance, and turbocharger inspection.' },
            { q: 'Can you service a GMC Sierra AT4 in Musaffah?', a: 'Yes. We handle full Sierra servicing including AT4 off-road package components, MultiPro tailgate electronics, and full suspension diagnostics.' },
            { q: 'Where is your GMC workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We are a specialist American vehicle workshop serving the full GMC range.' },
            { q: 'Is independent GMC service reliable?', a: 'Absolutely. Smart Motor uses genuine GM parts and factory-level diagnostic software. Our technicians are trained on all GMC platforms.' },
        ],
    },
    'jaguar': {
        name: 'Jaguar',
        description: 'Expert Jaguar service & repair in Musaffah M9, Abu Dhabi. F-Type, F-PACE & I-PACE specialists. Genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Jaguar service cost in Abu Dhabi?', a: 'Jaguar service at Smart Motor starts from AED 1,000. F-Type, F-PACE, and I-PACE pricing varies — contact us for a model-specific quote.' },
            { q: 'Do you service Jaguar F-Type supercharged engines?', a: 'Yes. Our technicians handle all Jaguar supercharged V6 and V8 engines including the 5.0L SVR, with full electronic throttle and exhaust valve calibration.' },
            { q: 'Can you service a Jaguar I-PACE electric in Musaffah?', a: 'Yes. We provide I-PACE electric vehicle servicing including battery health diagnostics, thermal management, regenerative braking calibration, and suspension service.' },
            { q: 'Where is your Jaguar workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi — serving Jaguar owners with specialist British vehicle expertise.' },
            { q: 'Do you use genuine Jaguar parts?', a: 'Yes. We use OEM and genuine Jaguar parts for all services and repairs, ensuring factory specifications and warranty compliance.' },
        ],
    },
    'volvo': {
        name: 'Volvo',
        description: 'Professional Volvo service & repair in Musaffah M9, Abu Dhabi. XC90, XC60 & S90 specialists. Genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Volvo service cost in Abu Dhabi?', a: 'Volvo service at Smart Motor starts from AED 800. XC90, XC60, and S90 pricing depends on powertrain type — contact us for a free quote.' },
            { q: 'Do you service Volvo Drive-E engines in Abu Dhabi?', a: 'Yes. We handle all Volvo Drive-E T5, T6, and T8 powertrain servicing including turbocharger, supercharger, and hybrid battery system maintenance.' },
            { q: 'Can you calibrate Volvo City Safety in Musaffah?', a: 'Yes. After windscreen replacement or front-end repairs, our technicians can recalibrate Volvo City Safety, Pilot Assist, and all ADAS camera systems.' },
            { q: 'Where is your Volvo workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi — a specialist Scandinavian and European vehicle workshop.' },
            { q: 'Is independent Volvo service safe for my warranty?', a: 'Yes. UAE consumer law protects your right to independent servicing. Smart Motor uses genuine Volvo parts and VIDA-compatible diagnostics.' },
        ],
    },
    'maserati': {
        name: 'Maserati',
        description: 'Specialist Maserati service & repair in Musaffah M9, Abu Dhabi. Ghibli, Levante & Quattroporte experts. Genuine parts. Book today.',
        faq: [
            { q: 'How much does Maserati service cost in Abu Dhabi?', a: 'Maserati service at Smart Motor is competitively priced versus authorized dealers. Ghibli, Levante, and Quattroporte pricing varies — contact us for an estimate.' },
            { q: 'Do you service Maserati Skyhook suspension?', a: 'Yes. We diagnose and repair Maserati Skyhook adaptive suspension systems including damper replacement, sensor calibration, and ride height adjustment.' },
            { q: 'Can you service a Maserati MC20 in Musaffah?', a: 'Yes. Our supercar specialists handle MC20 Nettuno V6 engine servicing, carbon fiber body care, and full electronic system diagnostics.' },
            { q: 'Where is Smart Motor for Maserati service?', a: 'We are at M9, Musaffah Industrial Area, Abu Dhabi. We provide premium service for all Maserati models.' },
            { q: 'Do you use genuine Maserati parts?', a: 'Yes. Smart Motor sources genuine Maserati parts to maintain factory specifications, performance, and your vehicle\'s resale value.' },
        ],
    },
    'dodge': {
        name: 'Dodge',
        description: 'Expert Dodge service & repair in Musaffah M9, Abu Dhabi. Challenger, Charger & Durango specialists. HEMI V8 experts. 6-month warranty.',
        faq: [
            { q: 'How much does Dodge Challenger service cost in Abu Dhabi?', a: 'Dodge Challenger service at Smart Motor starts from AED 600. HEMI V8, SRT, and Hellcat models may require additional performance-grade servicing — contact us for a quote.' },
            { q: 'Do you service Dodge HEMI V8 engines in Abu Dhabi?', a: 'Yes. Our American performance specialists handle all HEMI 5.7L, 6.4L, and 6.2L supercharged Hellcat engine servicing with OEM-grade parts and calibration.' },
            { q: 'Can you service a Dodge Durango SRT in Musaffah?', a: 'Yes. We handle Durango SRT servicing including 6.4L HEMI engine care, Brembo brake service, and performance suspension calibration.' },
            { q: 'Where is your Dodge workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi — serving Dodge and Mopar enthusiasts across the emirate.' },
            { q: 'Do you use genuine Mopar parts?', a: 'Yes. We use genuine Mopar parts for all Dodge service and repair work, maintaining factory HEMI performance and SRT specifications.' },
        ],
    },
    'jeep': {
        name: 'Jeep',
        description: 'Specialist Jeep service & repair in Musaffah M9, Abu Dhabi. Wrangler, Grand Cherokee & Gladiator experts. Genuine parts, 6-month warranty.',
        faq: [
            { q: 'How much does Jeep Wrangler service cost in Abu Dhabi?', a: 'Jeep Wrangler service at Smart Motor starts from AED 500. Rubicon and 392 models may require additional off-road system checks — contact us for a free quote.' },
            { q: 'Do you service Jeep 4WD systems in Abu Dhabi?', a: 'Yes. We handle all Jeep 4WD systems including Command-Trac, Rock-Trac, Quadra-Trac II, and Quadra-Drive II with full transfer case and differential servicing.' },
            { q: 'Can you service a Jeep Grand Cherokee in Musaffah?', a: 'Yes. We provide full Grand Cherokee servicing including Quadra-Lift air suspension, Selec-Terrain diagnostics, and V6/V8/4xe hybrid powertrain care.' },
            { q: 'Where is your Jeep workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We serve Jeep owners with specialist off-road and on-road vehicle expertise.' },
            { q: 'Do you use genuine Jeep parts?', a: 'Yes. We use genuine Mopar/Jeep parts for all services, maintaining Trail Rated performance and factory reliability.' },
        ],
    },
    'infiniti': {
        name: 'Infiniti',
        description: 'Professional Infiniti service & repair in Musaffah M9, Abu Dhabi. QX80, QX60 & Q50 specialists. Genuine parts, 6-month warranty.',
        faq: [
            { q: 'How much does Infiniti QX80 service cost in Abu Dhabi?', a: 'Infiniti QX80 service at Smart Motor starts from AED 700. Pricing includes full V8 engine service and hydraulic body motion control checks where applicable.' },
            { q: 'Do you service Infiniti VR30 twin-turbo engines?', a: 'Yes. We handle all Infiniti VR30DDTT twin-turbo V6 servicing for Q50, Q60, and QX55 models including turbocharger inspection and ECU diagnostics.' },
            { q: 'Can you service Infiniti Direct Adaptive Steering?', a: 'Yes. Our technicians can diagnose, calibrate, and repair Infiniti Direct Adaptive Steering systems and all related electronic components.' },
            { q: 'Where is Smart Motor for Infiniti service?', a: 'We are at M9, Musaffah Industrial Area, Abu Dhabi. We are a specialist Japanese luxury vehicle workshop.' },
            { q: 'Is independent Infiniti service as good as the dealer?', a: 'Yes. Smart Motor uses genuine Infiniti parts and Consult-compatible diagnostic tools — the same technology used in authorized service centres.' },
        ],
    },
    'genesis': {
        name: 'Genesis',
        description: 'Expert Genesis service & repair in Musaffah M9, Abu Dhabi. G90, G80 & GV80 specialists. Genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Genesis service cost in Abu Dhabi?', a: 'Genesis service at Smart Motor is competitively priced. G90, G80, and GV80 pricing varies by powertrain type — contact us for a model-specific quote.' },
            { q: 'Do you service Genesis twin-turbo engines in Abu Dhabi?', a: 'Yes. We handle all Genesis 2.5T and 3.5T twin-turbo engine servicing including the performance-oriented G70 and GV70 models.' },
            { q: 'Can you service Genesis HTRAC AWD in Musaffah?', a: 'Yes. Our technicians service Genesis HTRAC all-wheel drive systems including electronic limited-slip differential calibration and transfer case maintenance.' },
            { q: 'Where is your Genesis workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi — providing premium Korean luxury vehicle care.' },
            { q: 'Is independent Genesis service safe for my warranty?', a: 'Yes. UAE consumer law protects your right to independent servicing with genuine parts. Smart Motor provides warranty-safe Genesis care.' },
        ],
    },
    'honda': {
        name: 'Honda',
        description: 'Professional Honda service & repair in Musaffah M9, Abu Dhabi. Civic, Accord & CR-V specialists. Genuine parts, 6-month warranty.',
        faq: [
            { q: 'How much does Honda service cost in Abu Dhabi?', a: 'Honda service at Smart Motor starts from AED 350 for a minor service. Accord, CR-V, and Pilot pricing depends on engine type — contact us for a free quote.' },
            { q: 'Do you service Honda VTEC engines in Abu Dhabi?', a: 'Yes. Our technicians are trained on all Honda VTEC and Turbo VTEC engines including 1.5T Civic, 2.0T Accord, and 3.5L V6 Pilot models.' },
            { q: 'Can you service Honda hybrid vehicles in Musaffah?', a: 'Yes. We handle Honda i-MMD hybrid system servicing for Accord Hybrid, CR-V Hybrid, and City Hybrid including battery health checks and e-CVT maintenance.' },
            { q: 'Where is your Honda workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi. We serve Honda owners from across the emirate with genuine parts and expert care.' },
            { q: 'Is independent Honda service cheaper than Trading Enterprises?', a: 'Yes. Independent Honda service at Smart Motor saves 20–35% compared to authorized dealer pricing, using genuine Honda parts.' },
        ],
    },
    'mazda': {
        name: 'Mazda',
        description: 'Expert Mazda service & repair in Musaffah M9, Abu Dhabi. Skyactiv technology specialists. Genuine parts, 6-month warranty. Book today.',
        faq: [
            { q: 'How much does Mazda service cost in Abu Dhabi?', a: 'Mazda service at Smart Motor starts from AED 400. CX-5, CX-9, and Mazda3 pricing varies — contact us for a free quote.' },
            { q: 'Do you service Mazda Skyactiv engines in Abu Dhabi?', a: 'Yes. Our technicians handle all Skyactiv-G and Skyactiv-X engine servicing including direct injection carbon cleaning and compression optimization.' },
            { q: 'Can you service Mazda i-Activ AWD in Musaffah?', a: 'Yes. We service Mazda i-Activ AWD systems including transfer case fluid changes, coupling diagnostics, and G-Vectoring Control calibration.' },
            { q: 'Where is your Mazda workshop in Abu Dhabi?', a: 'Smart Motor is at M9, Musaffah Industrial Area, Abu Dhabi — serving Mazda owners with specialist Japanese vehicle care.' },
            { q: 'Do you use genuine Mazda parts?', a: 'Yes. We use OEM and genuine Mazda parts for all servicing, maintaining Skyactiv performance and factory specifications.' },
        ],
    },
    'mitsubishi': {
        name: 'Mitsubishi',
        description: 'Professional Mitsubishi service & repair in Musaffah M9, Abu Dhabi. Pajero, Outlander & L200 specialists. Genuine parts, 6-month warranty.',
        faq: [
            { q: 'How much does Mitsubishi Pajero service cost in Abu Dhabi?', a: 'Mitsubishi Pajero service at Smart Motor starts from AED 500. 3.0L V6 and 3.8L models have different service requirements — contact us for a model-specific quote.' },
            { q: 'Do you service Mitsubishi Super All-Wheel Control?', a: 'Yes. We handle Mitsubishi S-AWC system servicing including active yaw control, ACD centre differential, and AYC rear differential diagnostics.' },
            { q: 'Can you service a Mitsubishi Outlander PHEV in Musaffah?', a: 'Yes. Our technicians handle Outlander PHEV hybrid battery diagnostics, twin-motor system servicing, and regenerative brake calibration.' },
            { q: 'Where is Smart Motor for Mitsubishi service?', a: 'We are at M9, Musaffah Industrial Area, Abu Dhabi — serving Mitsubishi owners across Abu Dhabi and the Western Region.' },
            { q: 'Do you use genuine Mitsubishi parts?', a: 'Yes. Smart Motor uses genuine Mitsubishi parts for all services and repairs, maintaining factory reliability and off-road capability.' },
        ],
    },
}

// ─── Server-side metadata ────────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const brand = brandMeta[slug] ?? {
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: `Professional ${slug.replace(/-/g, ' ')} service & repair in Abu Dhabi. Certified technicians at Smart Motor Musaffah M9. 6-month warranty.`,
        faq: [],
    }

    return {
        title: `${brand.name} Service & Repair Abu Dhabi | Smart Motor Musaffah`,
        description: brand.description,
        openGraph: {
            title: `${brand.name} Service & Repair Abu Dhabi | Smart Motor Musaffah`,
            description: brand.description,
            url: `https://smartmotor.ae/brand/${slug}`,
            siteName: 'Smart Motor Auto Repair',
            images: [
                {
                    url: `/images/hero/${slug}-banner.webp`,
                    width: 1200,
                    height: 630,
                    alt: `${brand.name} specialist workshop at Smart Motor, Musaffah M9 Abu Dhabi`,
                },
            ],
            locale: 'en_AE',
            type: 'website',
        },
        alternates: {
            canonical: `https://smartmotor.ae/brand/${slug}`,
        },
    }
}

// ─── Page (server component) ─────────────────────────────────────────────────
export default async function BrandPage({ params }: Props) {
    const { slug } = await params
    const brand = brandMeta[slug] ?? {
        name: slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        description: `Professional ${slug.replace(/-/g, ' ')} service & repair in Abu Dhabi.`,
        faq: [],
    }

    // ── Structured data: AutoRepair (brand-specific) ─────────────────────────
    const autoRepairJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'AutoRepair',
        name: `Smart Motor ${brand.name} Specialist Abu Dhabi`,
        image: 'https://smartmotor.ae/images/hero/store-front.webp',
        url: `https://smartmotor.ae/brand/${slug}`,
        telephone: '+97125555443',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'M9, Musaffah Industrial Area',
            addressLocality: 'Abu Dhabi',
            addressRegion: 'Abu Dhabi',
            addressCountry: 'AE',
        },
        description: `Professional ${brand.name} service, repair and maintenance in Abu Dhabi. Factory-trained technicians, genuine parts and 6-month warranty at Smart Motor Musaffah M9.`,
        priceRange: '$$$',
        openingHours: 'Mo-Sa 08:00-19:00',
    }

    // ── Structured data: FAQPage ─────────────────────────────────────────────
    const faqJsonLd = brand.faq.length > 0
        ? {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: brand.faq.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
            })),
        }
        : null

    // ── Structured data: BreadcrumbList ─────────────────────────────────────
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartmotor.ae' },
            { '@type': 'ListItem', position: 2, name: `${brand.name} Service Abu Dhabi`, item: `https://smartmotor.ae/brand/${slug}` },
        ],
    }

    return (
        <>
            {/* Server-rendered structured data — reliable for Googlebot */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(autoRepairJsonLd) }}
            />
            {faqJsonLd && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />
            )}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />

            {/* Client component handles all interactive UI */}
            <BrandPageClient slug={slug} />
        </>
    )
}
