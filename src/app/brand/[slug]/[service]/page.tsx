import type { Metadata } from 'next'
import { Navbar } from '@/components/v2/layout/navbar'
import { Footer } from '@/components/v2/layout/footer'
import { adminGetAllBrands, adminGetAllServices } from '@/lib/firebase-admin'
import { notFound } from 'next/navigation'
import { ShieldCheck, Wrench, ChevronRight, Zap, Award, Clock, ArrowRight, Gauge, Shield, Ruler } from 'lucide-react'
import Link from 'next/link'

import { Brand, Service } from '@/types'

// Re-use the brand data from the main page for consistency
// Re-use the brand data from the main page for consistency
const BRAND_DATA: Record<string, { accentColor: string; origin: string; website: string; specialties: string[] }> = {
    bmw: { accentColor: '#1C69D4', origin: 'German', website: 'https://www.bmw.ae', specialties: ['inline-6 engines', 'xDrive AWD systems', 'iDrive technology', 'M-Sport suspension'] },
    'mercedes-benz': { accentColor: '#C0A060', origin: 'German', website: 'https://www.mercedes-benz.ae', specialties: ['AMG performance tuning', 'AIRMATIC suspension', 'MBUX infotainment', 'EQ electric systems'] },
    porsche: { accentColor: '#E62329', origin: 'German', website: 'https://www.porsche.com/middle-east', specialties: ['flat-six engines', 'PDK dual-clutch', 'PASM adaptive dampers', 'rear-engine dynamics'] },
    'range-rover': { accentColor: '#2D6A4F', origin: 'British', website: 'https://www.landrover.ae', specialties: ['air suspension', 'Terrain Response', 'Ingenium engines', 'off-road calibration'] },
    'land-rover': { accentColor: '#2D6A4F', origin: 'British', website: 'https://www.landrover.ae', specialties: ['air suspension', 'Terrain Response', 'Ingenium engines', 'off-road calibration'] },
    toyota: { accentColor: '#EB0A1E', origin: 'Japanese', website: 'https://www.toyota.ae', specialties: ['hybrid synergy drive', 'VVT-i engines', 'Toyota Safety Sense', 'Land Cruiser systems'] },
    nissan: { accentColor: '#C3002F', origin: 'Japanese', website: 'https://www.nissan-me.com', specialties: ['VQ-series engines', 'ProPILOT assist', 'e-POWER hybrid', 'Patrol V8 systems'] },
    audi: { accentColor: '#BB0A21', origin: 'German', website: 'https://www.audi-me.com', specialties: ['Quattro AWD systems', 'TFSI turbo engines', 'MMI navigation', 'S-tronic transmission'] },
    lexus: { accentColor: '#8B0000', origin: 'Japanese', website: 'https://www.lexus.ae', specialties: ['hybrid powertrain', 'Mark Levinson audio', 'self-leveling AHS', 'Lexus Safety System+'] },
    lamborghini: { accentColor: '#FFD700', origin: 'Italian', website: 'https://www.lamborghini.com', specialties: ['V10/V12 engines', 'carbon ceramic brakes', 'Haldex AWD', 'aerodynamic systems'] },
    'rolls-royce': { accentColor: '#7B3F61', origin: 'British', website: 'https://www.rolls-roycemotorcars.com', specialties: ['bespoke coach-built systems', 'self-leveling air suspension', 'starlight headliner', 'V12 powertrain'] },
    bentley: { accentColor: '#2C3E2D', origin: 'British', website: 'https://www.bentleymotors.com', specialties: ['W12 twin-turbo engines', 'active anti-roll bars', '48V electrical systems', 'air suspension'] },
    ferrari: { accentColor: '#DC143C', origin: 'Italian', website: 'https://www.ferrari.com', specialties: ['mid-engine V8/V12', 'F1 dual-clutch gearbox', 'Manettino drive modes', 'E-Diff electronic differential'] },
    maserati: { accentColor: '#003366', origin: 'Italian', website: 'https://www.maserati.com', specialties: ['twin-turbo V6/V8', 'Skyhook adaptive suspension', 'ZF automatic transmission', 'MC Stradale tuning'] },
    'alfa-romeo': { accentColor: '#8B0000', origin: 'Italian', website: 'https://www.alfaromeo.com', specialties: ['MultiAir engines', 'DNA drive modes', 'rear-transaxle layout', 'carbon fiber construction'] },
    volkswagen: { accentColor: '#001E50', origin: 'German', website: 'https://www.volkswagen-me.com', specialties: ['TSI turbo engines', 'DSG dual-clutch', '4MOTION AWD', 'digital cockpit systems'] },
    honda: { accentColor: '#CC0000', origin: 'Japanese', website: 'https://www.honda-me.com', specialties: ['VTEC engines', 'i-MMD hybrid', 'Honda Sensing ADAS', 'Earth Dreams technology'] },
    hyundai: { accentColor: '#002C5F', origin: 'Korean', website: 'https://www.hyundai.com/ae', specialties: ['SmartSense safety', 'GDi turbo engines', 'HTRAC AWD', 'Blue Link connectivity'] },
    kia: { accentColor: '#05141F', origin: 'Korean', website: 'https://www.kia.com/ae', specialties: ['Smartstream engines', 'Drive Wise ADAS', 'EV400 electric platform', 'dual-clutch transmission'] },
    mazda: { accentColor: '#910000', origin: 'Japanese', website: 'https://www.mazda-me.com', specialties: ['Skyactiv-X engines', 'i-Activ AWD', 'Kodo design language', 'G-Vectoring Control'] },
    ford: { accentColor: '#003478', origin: 'American', website: 'https://www.ford-me.com', specialties: ['EcoBoost engines', 'SelectShift transmission', 'Co-Pilot360 safety', 'Raptor off-road systems'] },
    chevrolet: { accentColor: '#D4A017', origin: 'American', website: 'https://www.chevroletarabia.com', specialties: ['small-block V8 engines', 'Magnetic Ride Control', '10-speed automatic', 'MyLink infotainment'] },
    gmc: { accentColor: '#CC0000', origin: 'American', website: 'https://www.gmcarabia.com', specialties: ['Duramax diesel', 'MultiPro tailgate', 'Magnetic Ride Control', 'AT4 off-road systems'] },
    cadillac: { accentColor: '#8B7355', origin: 'American', website: 'https://www.cadillacarabia.com', specialties: ['Blackwing V8 engines', 'Super Cruise ADAS', 'MagneRide suspension', 'AKG audio systems'] },
    dodge: { accentColor: '#BA0C2F', origin: 'American', website: 'https://www.dodge-me.com', specialties: ['HEMI V8 engines', 'SRT performance tuning', 'Brembo braking', 'TorqueFlite transmission'] },
    jeep: { accentColor: '#3A5F0B', origin: 'American', website: 'https://www.jeep-me.com', specialties: ['Selec-Terrain traction', 'Command-Trac 4WD', 'Trail Rated systems', 'PentaStar V6 engines'] },
    mitsubishi: { accentColor: '#ED1C24', origin: 'Japanese', website: 'https://www.mitsubishi-motors.ae', specialties: ['MIVEC engines', 'Super All-Wheel Control', 'reinforced body structure', 'PHEV systems'] },
    subaru: { accentColor: '#013B8A', origin: 'Japanese', website: 'https://www.subaru-me.com', specialties: ['Boxer engines', 'Symmetrical AWD', 'EyeSight driver assist', 'lineartronic CVT'] },
    infiniti: { accentColor: '#1A1A2E', origin: 'Japanese', website: 'https://www.infiniti-me.com', specialties: ['VR30 twin-turbo V6', 'Direct Adaptive Steering', 'ProActive suspension', 'InTouch infotainment'] },
    genesis: { accentColor: '#1C2B4A', origin: 'Korean', website: 'https://www.genesis.com/ae', specialties: ['twin-turbo V6', 'HTRAC AWD', 'Electronic Limited Slip Diff', 'smart posture care'] },
    volvo: { accentColor: '#003057', origin: 'Swedish', website: 'https://www.volvocars.com/ae', specialties: ['Drive-E powertrains', 'City Safety collision avoidance', 'Pilot Assist semi-autonomous', 'air quality systems'] },
    peugeot: { accentColor: '#003DA5', origin: 'French', website: 'https://www.peugeot.ae', specialties: ['PureTech turbo engines', 'i-Cockpit interface', 'EAT8 automatic transmission', 'Grip Control traction'] },
    jaguar: { accentColor: '#006747', origin: 'British', website: 'https://www.jaguar.ae', specialties: ['Ingenium engines', 'Adaptive Dynamics', 'configurable dynamics', 'all-wheel drive systems'] },
    'mini-cooper': { accentColor: '#2D6A4F', origin: 'British', website: 'https://www.mini.ae', specialties: ['TwinPower Turbo engines', 'ALL4 AWD', 'dynamic stability control', 'MINI Connected'] },
}

// Generate unique content per brand×service combination
function getUniqueContent(brand: Brand, service: Service, brandData: typeof BRAND_DATA[string] | undefined) {
    const origin = brandData?.origin || 'European'
    const specialties = brandData?.specialties || ['precision engineering', 'advanced diagnostics', 'electronic systems', 'performance calibration']

    // Service-specific technical details
    const serviceContent: Record<string, { challenges: string; approach: string; uaeContext: string; technicalProcess: string }> = {
        'major-service': {
            challenges: `A comprehensive ${brand.name} major service goes far beyond a standard oil change. Modern ${origin} vehicles are highly complex networks of mechanical and electronic systems operating at extreme tolerances. Every ${brand.name} model has unique service intervals, proprietary fluid specifications, and specific physical inspection criteria that generic workshops routinely overlook. ${brand.name} vehicles demand specific attention to ${specialties[0]} and ${specialties[1]}, which require specialized diagnostic equipment and factory-certified training. Ignoring these specific intervals often leads to compounded mechanical failures, significantly reducing fuel efficiency and the lifespan of the engine.`,
            approach: `At Smart Motor, our certified master technicians follow the exact ${brand.name} manufacturer service schedule, utilizing a rigorous 150+ point digital and mechanical inspection checklist developed specifically for high-end ${origin} vehicles. We don't guess; we verify ${specialties[2]} calibration using dealer-level OBD scanners, inspect all wear components against precise factory tolerances using micrometers, and ensure every single drop of fluid—from transmission oil to brake fluid—meets or exceeds the manufacturer's exact viscosity and grade requirements. We also address ${specialties[3]} to ensure optimal driving dynamics.`,
            uaeContext: `Abu Dhabi's extreme environment—where summer ambient temperatures regularly exceed 50°C and radiant road heat is even higher—places extraordinary thermal stress on ${brand.name} cooling systems, battery health, and lubricant breakdown rates. Fine silica desert sand acts as an abrasive paste on moving parts and chokes filtration systems. Our ${brand.name} major service protocol adapts the standard European schedule for the UAE. We implement localized checks for AC refrigerant levels, coolant concentration ratios specifically tuned for extreme heat, and severe sand ingress—factors that standard ${origin} factory schedules simply do not account for.`,
            technicalProcess: `Our major service begins with a full system scan using ${brand.name}-specific diagnostic software to pull any shadow codes. We then elevate the vehicle to inspect the subframe, control arms, and exhaust routing. We perform a hot oil drain to evacuate maximum contaminants, replace the oil filter, engine air filter, and cabin microfilter. Spark plugs (or glow plugs) are inspected and replaced if at the interval limit. Finally, we reset the onboard service indicator and provide you with a comprehensive, transparent digital health report.`
        },
        'oil-change': {
            challenges: `${brand.name} engines are precision instruments that demand manufacturer-specified oil grades and viscosities to function correctly. The variable valve timing mechanisms and turbocharger bearings in ${origin} engines rely entirely on exact hydraulic pressure provided by the engine oil. Using an incorrect, generic oil viscosity in a ${brand.name} can cause accelerated wear on ${specialties[0]}, drastically reduce fuel efficiency, cause timing chain stretch, and potentially trigger catastrophic warning lights in the ${specialties[2]} system. Furthermore, cheap aftermarket filters often bypass oil under high pressure, sending unfiltered contaminants directly into the engine block.`,
            approach: `We treat an oil change as a critical preventative maintenance procedure. We stock only factory-approved, fully synthetic oil grades tailored for every ${brand.name} model, from entry-level sedans to high-performance variants. Our technicians verify the exact required specification using ${brand.name}'s official technical service documentation. We utilize advanced extraction methods alongside traditional gravity draining to ensure complete evacuation of old oil and sludge. We only install genuine or premium OEM-supplier oil filters, ensuring your engine receives exactly what was engineered for it.`,
            uaeContext: `The UAE's extreme heat and stop-and-go traffic patterns accelerate oil oxidation and thermal degradation significantly faster than in the ${origin === 'German' || origin === 'British' || origin === 'Swedish' || origin === 'French' ? 'European' : origin} climates where these vehicles were originally engineered. We strongly recommend shortened, proactive oil change intervals for ${brand.name} vehicles driven in Abu Dhabi—typically between 8,000 to 10,000 km, instead of the standard 15,000 km European interval. This is the single most effective way to prevent premature engine wear in the desert climate.`,
            technicalProcess: `The procedure includes checking the current oil level and condition to assess internal engine health. The vehicle is lifted, the undertray is carefully removed, and the oil is drained completely. The oil filter housing is meticulously cleaned before installing the new OEM filter and replacing the crucial O-ring seals to prevent leaks. After filling with the exact capacity of synthetic oil, the engine is run to operating temperature to check for proper pressure, and the service interval is electronically reset.`
        },
        'brake-repair': {
            challenges: `Stopping a heavy, high-performance ${brand.name} vehicle from highway speeds requires a braking system operating at peak mechanical efficiency. ${brand.name} braking systems are engineered with ${specialties.length > 2 ? specialties[3] : 'advanced friction materials'} and model-specific ABS/ESP hydraulic calibrations. Fitting generic, low-quality aftermarket brake pads or failing to properly clean and bed-in replacement components can severely compromise stopping distances, cause violent steering wheel judder, induce high-pitched squealing, and trigger electronic stability control faults. The ${origin} engineering requires exact tolerances.`,
            approach: `Every ${brand.name} brake service at Smart Motor is executed with surgical precision. We measure the brake disc (rotor) thickness using digital micrometers to determine if they meet the minimum factory safety specifications or if they require replacement alongside the pads. We exclusively use OEM-grade pads (such as Brembo, Textar, or Pagid) matched perfectly to your specific model to maintain the original braking feel. After installation, we perform the manufacturer's recommended thermal bedding-in procedure and recalibrate the electronic parking brake system using ${brand.name}-compatible diagnostic tools.`,
            uaeContext: `Stop-and-go traffic in Abu Dhabi city combined with high-speed highway driving to Dubai creates demanding, extreme thermal cycling on ${brand.name} brake components. The ambient heat drastically reduces the cooling efficiency of the brake rotors, increasing the risk of brake fade. Furthermore, fine sand contamination in the caliper slide pins is a unique UAE issue we routinely address. We also flush the brake fluid with high-boiling-point DOT 4 or 5.1 fluid, as standard fluid absorbs coastal humidity rapidly, leading to a spongy, unsafe pedal feel.`,
            technicalProcess: `The wheels are removed and the entire assembly is inspected for leaks and wear. The calipers are safely retracted, and the carrier slides are wire-brushed clean and lubricated with high-temperature ceramic anti-seize paste to ensure smooth operation and prevent noise. New pads, anti-rattle clips, and electronic wear sensors are installed. If required, new discs are mounted to a perfectly clean hub to prevent lateral runout. The system is then hydraulically bled of any air pockets.`
        },
        'ac-repair': {
            challenges: `The climate control systems in modern ${brand.name} vehicles do much more than simply blow cold air. They are highly sophisticated thermodynamic networks involving dual or quad-zone sensors, electronic blend door actuators, and variable-displacement compressors. These ${origin}-engineered components are designed for moderate European weather—not the 50°C heat of Abu Dhabi summers. Diagnosing an AC issue in a ${brand.name} requires pinpointing micro-leaks, compressor clutch failures, or CAN-bus communication errors between the climate control module and the engine ECU. Simply adding "freon" is a temporary and often damaging band-aid.`,
            approach: `Our certified AC technicians are specifically trained on ${brand.name} climate control architectures. We utilize fully automated, precision refrigerant recovery and recharging stations. We do not guess. We evacuate the remaining refrigerant, pull a deep vacuum for 30 minutes to boil off any internal moisture, and hold the vacuum to test for system integrity. If a leak is present, we inject UV dye and use electronic sniffers to locate it. We repair the system using exact factory refrigerant weights and specify the correct PAG oil to ensure the compressor remains lubricated.`,
            uaeContext: `An AC failure in Abu Dhabi is not merely a discomfort—it is a critical safety and drivability hazard. We observe a massive spike in ${brand.name} compressor failures every May through September. The compressor, evaporator, and condenser in a ${brand.name} work 3 to 4 times harder in UAE conditions compared to their design baseline. Our preventive AC health check includes deep-cleaning the condenser fins at the front of the car—which become heavily clogged with desert sand, ruining heat dissipation—and replacing the cabin filter with an activated carbon unit to block dust and exterior odors.`,
            technicalProcess: `Diagnosis begins with measuring vent temperature differentials and reading high/low side system pressures via diagnostic gauges. We scan the HVAC module for electronic flap actuator faults. Once the mechanical or electronic failure is repaired, the system is flushed to remove any metal debris from a failed compressor. We then pull a deep vacuum, recharge the system with precise R134a or R1234yf refrigerant, and verify the cabin cooling curve against ${brand.name} factory standards.`
        },
        'engine-repair': {
            challenges: `${brand.name} engines represent the pinnacle of ${origin} automotive engineering. They incorporate ${specialties[0]}—sophisticated technology including direct fuel injection, variable valve timing (VVT), and twin-scroll turbocharging. These incredibly tight tolerances mean that even minor issues—such as a failing high-pressure fuel injector, a slightly stretched timing chain, or a hidden vacuum leak—can cause significant power loss, severe misfires, or a flashing Check Engine Light. Misdiagnosis of these engine faults is rampant at general workshops, frequently leading to the unnecessary replacement of expensive parts without solving the root cause.`,
            approach: `We strictly adhere to a diagnostic-first philosophy for engine repair. Before disassembling any components, our master technicians deploy dealer-level ${brand.name}-compatible diagnostic platforms. We interrogate every ECU in the vehicle, analyzing live data streams, performing active component actuation tests, and reviewing freeze-frame fault data. Whether the issue requires replacing a complex high-pressure fuel pump, resolving an intricate VANOS/VVT timing fault, or executing a complete engine rebuild, we perform the work with surgical precision utilizing only genuine OEM components and the specific factory locking tools required for your engine code.`,
            uaeContext: `Abu Dhabi's extreme environment is actively hostile to engine longevity. The intense, constant heat radically accelerates the degradation of rubber valve cover gaskets, oil filter housing seals, and plastic cooling system components, leading to the severe oil and coolant leaks frequently seen in ${brand.name} engines in the UAE. Furthermore, local fuel quality variations combined with high ambient temperatures increase the risk of engine knock and carbon buildup on intake valves in direct-injection engines. We prioritize identifying and reinforcing these heat-related failure points.`,
            technicalProcess: `After confirming the exact diagnosis via electronic scanning and physical tests (like compression or cylinder leak-down tests), the affected engine area is carefully disassembled. We meticulously clean all aluminum mating surfaces before installing new gaskets to ensure a perfect seal. For complex timing chain or camshaft work, we utilize ${brand.name} specific timing blocks to ensure perfect mechanical synchronization. Post-repair, the engine is extensively road-tested while logging live data to guarantee the fault is permanently resolved.`
        },
        'transmission-repair': {
            challenges: `${brand.name} transmissions—whether they are advanced ZF 8-speed automatics, dual-clutch systems (DCT/PDK), or CVTs—are among the most complex hydraulic and electronic components in the vehicle. They rely entirely on perfectly clean fluid and precise mechatronic solenoid actuation to shift smoothly. Over time, internal friction clutches wear down, shedding microscopic particles that contaminate the fluid. ${specialties.length > 3 ? `The ${specialties[3]}` : 'The transmission control system'} uses complex adaptive learning algorithms. Ignoring transmission service leads to harsh shifting, delayed engagement, slipping gears, and eventually, total transmission failure—one of the most expensive repairs possible on a ${origin} vehicle.`,
            approach: `We reject the manufacturer myth of "lifetime transmission fluid." Our transmission specialists perform comprehensive diagnostics before recommending any repair, including fluid condition analysis, solenoid resistance testing, and valve body inspection. For routine service, we drop the transmission pan, replace the internal filter (or the entire integrated pan unit), and execute a complete fluid exchange using strictly manufacturer-approved ATF fluids. Crucially, we use specialized diagnostic tools to reset the Transmission Control Module (TCM) adaptations, forcing the computer to relearn shift points with the fresh hydraulic fluid.`,
            uaeContext: `Heat is the absolute worst enemy of an automatic transmission. UAE driving patterns—frequent short trips in 50°C heat, heavy traffic idling, and sudden high-speed highway merges—create the worst possible thermal conditions for ${brand.name} transmissions. In Abu Dhabi traffic, transmission fluid temperatures skyrocket, causing the fluid to oxidize, varnish, and lose its vital lubricating properties rapidly. We strongly recommend transmission fluid and filter changes at 60,000 km for all ${brand.name} vehicles in the UAE to prevent the delicate mechatronic unit from overheating and failing.`,
            technicalProcess: `The vehicle is raised level on a hoist, and the old, degraded fluid is drained. The transmission pan is removed, and the internal magnets are carefully inspected for excessive metal shavings—a key indicator of internal clutch failure. A new OEM filter and gasket are installed. The transmission is refilled with the exact factory-specified fluid using a specialized pump. The vehicle is started, and the fluid level is precisely verified via the overflow plug while monitoring the internal fluid temperature (usually strictly between 30°C and 50°C) using a diagnostic scanner.`
        },
        'electrical-repair': {
            challenges: `Modern ${brand.name} vehicles are essentially rolling computer networks, containing upwards of 80+ distinct electronic control units (ECUs) networked together via high-speed CAN-bus, LIN-bus, and FlexRay protocols. A single chafed wire, a corroded ground point, or a minor voltage drop can trigger a cascade of multiple warning lights across the dashboard, disabling everything from the infotainment to the ABS. The ${specialties[2]} system alone requires immense expertise. Electrical diagnosis in ${origin} vehicles requires an understanding of complex wiring schematics that goes lightyears beyond plugging in a generic OBD-II scanner.`,
            approach: `We invest heavily in factory-level diagnostic software and advanced hardware like digital storage oscilloscopes. This provides us with ${brand.name}-specific guided fault finding, allowing us to test component activation directly from the laptop. Our electrical technicians do not "parts dart" (guessing by replacing parts); we trace voltage drops, verify CAN-bus communication integrity, and isolate parasitic battery drains. We also have the capability to perform highly technical ECU coding, retrofit programming, and new battery registration—essential capabilities that most independent workshops simply lack.`,
            uaeContext: `The relentless UAE heat actively destroys automotive electronics. The extreme under-hood temperatures literally bake the wiring harness insulation until it becomes brittle, cracks, and shorts out against the chassis. Furthermore, the intense heat severely limits battery lifespan—a car battery in Abu Dhabi typically lasts only 1.5 to 2.5 years compared to 5 years in Europe. We routinely diagnose and repair heat-damaged sensor wiring, melted connectors, and prematurely aged AGM batteries in ${brand.name} vehicles—issues directly caused by the punishing local climate.`,
            technicalProcess: `Electrical repair begins with a full global vehicle network scan to map out which modules are communicating and which are offline. We then consult the official ${brand.name} wiring diagrams for the specific chassis code. Using multimeters and oscilloscopes, we back-probe connectors to verify power, ground, and signal integrity without damaging the wiring. Once the faulty wire, relay, or module is identified, it is repaired using high-quality, heat-resistant automotive wiring and sealed with marine-grade heat shrink tubing to prevent future corrosion.`
        },
        'suspension-repair': {
            challenges: `The suspension system on your ${brand.name} does far more than provide a comfortable ride; it is the critical link that keeps the tires in constant contact with the road, governing safe braking distances and high-speed cornering stability. ${brand.name} vehicles frequently feature highly sophisticated multi-link setups, active sway bars, or complex ${specialties.length > 1 ? specialties[1] : 'adaptive air suspension'} systems designed for smooth ${origin} roads. Over time, rubber control arm bushings dry rot and tear, heavy-duty ball joints wear out, and pressurized air struts develop micro-leaks. A compromised suspension utterly ruins the handling characteristics of your vehicle and causes rapid, expensive, and uneven tire wear.`,
            approach: `We perform a comprehensive, physical undercarriage inspection. We elevate the vehicle and use pry bars to detect microscopic play in lower and upper control arms, tie rod ends, and sway bar links. If your ${brand.name} is equipped with air suspension, we utilize specialized soap solutions and computer diagnostics to pinpoint exact leaks in the air struts, valve blocks, or to test the compressor's pressure output. We exclusively use high-quality OEM replacement parts (such as Lemförder or Arnott) to restore the tight, responsive, factory-original handling that your ${brand.name} is famous for.`,
            uaeContext: `Abu Dhabi's specific road conditions are a nightmare for suspension components. The constant impact of aggressive speed bumps, unexpected potholes in construction zones, and the intense radiant heat from the sun-baked asphalt literally bake the rubber bushings in your suspension system, causing them to crack and fail years earlier than they would in a cooler climate. Furthermore, the fine desert sand acts as an abrasive paste on ball joints and air suspension bladders. We frequently replace worn control arm bushings and leaking air struts—the primary suspension casualties of the UAE driving environment.`,
            technicalProcess: `The worn component is safely removed using specialized pullers. For control arm bushings, we utilize a 20-ton hydraulic shop press to extract the old, torn rubber and press in the new OEM bushing, often saving the customer the immense cost of replacing the entire forged aluminum arm. Crucially, all new suspension components are tightened and torqued to exact factory specifications only when the vehicle is resting on its wheels at normal ride height—preventing immediate bushing tear (preload). Finally, a comprehensive 3D laser wheel alignment is performed to guarantee perfect steering geometry.`
        },
        'ceramic-coating': {
            challenges: `Applying a true ceramic coating to a premium ${brand.name} vehicle requires immense preparation; the coating itself is merely the final step. Any swirl marks, automated car wash scratches, water spots, or paint oxidation will be permanently sealed and magnified under the hardened ceramic layer. ${brand.name}'s multi-stage ${origin} paint systems possess specific clear-coat hardness characteristics (some very hard, some surprisingly soft) that demand careful, expert machine polishing to correct without burning through the clear coat.`,
            approach: `We treat exterior detailing as an art form. Before any coating is applied, we perform an intensive multi-stage paint correction process. We use a combination of rotary and dual-action polishers with compounds specifically selected for your ${brand.name}'s exact paint hardness to remove 90-95% of all surface defects, restoring a mirror-like finish. Only then do we apply a professional-grade 9H nano-ceramic coating. This application is executed in a brightly lit, dust-free, climate-controlled detailing bay to ensure optimal chemical cross-linking and curing of the ceramic matrix.`,
            uaeContext: `In Abu Dhabi, the UV index regularly exceeds an extreme level of 11+, violently oxidizing unprotected paint and turning deep colors milky and dull. Furthermore, airborne sand particles act as a constant micro-abrasive on the highway, slowly dulling the finish. For ${brand.name} vehicles in the UAE, ceramic coating is not a luxury aesthetic upgrade—it is an essential, hardened, hydrophobic protective shield. It prevents UV fading, repels chemical bird droppings, makes the car significantly easier to wash, and crucially preserves the vehicle's long-term resale value.`,
            technicalProcess: `The vehicle undergoes a thorough chemical decontamination wash to remove iron fallout and road tar, followed by a mechanical clay bar treatment to pull embedded contaminants from the clear coat. The paint thickness is measured before multi-stage machine polishing eliminates swirl marks. The paint is then wiped down with an isopropyl alcohol solution to remove all polishing oils. Finally, the liquid ceramic polymer is applied panel by panel, allowed to flash (partially cure), and carefully leveled off with microfiber towels to create a flawless, hardened glass-like layer.`
        },
        'window-tinting': {
            challenges: `Modern ${brand.name} vehicles are complex. They frequently feature deeply curved acoustic glass, radio antennas embedded directly into the rear windshield, and highly sensitive forward-facing ADAS (Advanced Driver Assistance Systems) camera zones behind the rearview mirror. Applying cheap, generic window tint often results in bubbling, peeling, or turning a hideous purple over time. Worse, metallic-based cheap tints can actively block GPS, cellular, and radio signals, while improper installation can interfere with your ${brand.name}'s critical ${specialties[2]} and lane-keeping camera systems.`,
            approach: `At Smart Motor, we exclusively utilize premium, non-metallic nano-ceramic window films. These advanced films reject up to 99% of harmful UV rays and a massive percentage of infrared (IR) heat, while maintaining 100% compatibility with all internal electronic and cellular systems. Our master installers use computer-cut templates specific to your exact ${brand.name} model, ensuring perfect, razor-sharp edges without ever taking a blade to your vehicle's glass. We are meticulously trained to identify and cleanly bypass ADAS sensor zones to maintain full vehicle safety functionality.`,
            uaeContext: `With Abu Dhabi summer temperatures routinely exceeding 50°C, the interior of a parked car can reach lethal temperatures of 80°C+. Our high-IR rejection ceramic tints drastically reduce cabin temperature, easing the immense burden on your AC compressor and protecting your ${brand.name}'s expensive leather interior and dashboard from drying out and cracking in the sun. Furthermore, we ensure your vehicle receives the maximum legal tint level permitted by UAE traffic law, ensuring you remain fully compliant during your annual Abu Dhabi Police/RTA vehicle inspection (Fahes).`,
            technicalProcess: `The vehicle's interior door panels and electronics are protected with drop cloths and moisture barriers. The interior glass surfaces are surgically cleaned and prepped. The ceramic film is computer-cut to the exact dimensions of the ${brand.name}'s windows. For curved glass like the rear windshield, the film is heat-shrunk on the outside of the glass to mold to the curve perfectly before being installed on the interior. The film is applied using a specialized slip solution and squeegeed aggressively to remove all moisture, ensuring a flawless, bubble-free cure.`
        },
        'detailing': {
            challenges: `The luxurious interiors of ${brand.name} vehicles feature premium, delicate materials—fine Nappa or Merino leather, authentic Alcantara, open-pore wood, piano black trim, and highly engineered ${origin} soft-touch plastics. These materials require specific, chemically balanced cleaning products. Using aggressive, generic car wash chemicals or harsh degreasers will strip the essential oils from the leather, permanently discolor aluminum trims, and leave a greasy, dust-attracting residue on the dashboard. Deep cleaning requires patience and specialized knowledge of material science.`,
            approach: `Our interior detailing protocol for ${brand.name} vehicles is a restoration process. We strictly utilize pH-neutral, brand-safe interior cleaners and conditioners tailored to every specific surface. We use pressurized dry steam vapor to sanitize and lift deeply embedded dirt from pores without saturating electronic components. We gently agitate leather with ultra-soft horsehair brushes to remove body oils and dye transfer from jeans. Finally, we condition the leather to restore its supple factory feel and apply a matte-finish UV-protective treatment to all dashboard and trim surfaces.`,
            uaeContext: `The Abu Dhabi environment is incredibly harsh on vehicle interiors. Ultra-fine desert dust infiltrates the cabin daily, settling into every crevice, switch, and carpet fiber, where it acts like sandpaper against the leather as you move in the seat. Combined with extreme cabin temperatures when parked outdoors, this causes accelerated interior degradation—dashboard cracking, leather shrinking, and UV fading of wood trims. Regular, professional, deep-extraction detailing for your ${brand.name} is mandatory in the UAE to extract this sand and hydrate the materials against the relentless sun.`,
            technicalProcess: `The process begins with a meticulous dry vacuuming of the entire cabin, using compressed air to blow dust out of tight seat rails and AC vents. Carpets and floor mats undergo hot-water extraction to pull out deep sand. Leather seats are treated with a dedicated leather cleaner and agitated with soft brushes before being wiped clean and hydrated with a premium leather conditioner. All glass is polished streak-free, and all plastic and vinyl surfaces are coated with a non-greasy, anti-static UV protectant to repel future dust accumulation.`
        },
        'paint-protection': {
            challenges: `The beautiful, flawless ${origin} paint finish on your ${brand.name} is highly vulnerable to physical damage. Once a stone chips the paint down to the primer or bare metal, the original factory finish is permanently compromised. While ceramic coatings provide excellent chemical and UV resistance, they do absolutely nothing to stop physical impacts from rocks or deep scratches. Repainting a damaged panel on a high-end ${brand.name} is incredibly expensive, rarely matches the factory orange-peel texture perfectly, and instantly diminishes the resale value of the vehicle.`,
            approach: `The ultimate physical defense is Paint Protection Film (PPF). We apply premium, optically clear, self-healing polyurethane film to the exterior of your ${brand.name}. We do not bulk-install and cut on the car. Instead, we use advanced plotting software to computer-cut exact templates specifically designed for the precise body panels, compound curves, and edges unique to your exact model. This ensures perfect fitment with wrapped edges where possible, making the film virtually invisible while providing an impenetrable armor against road debris.`,
            uaeContext: `Driving on the E11 highway between Abu Dhabi and Dubai, or navigating construction zones, constantly exposes your ${brand.name} to flying gravel, debris, and severe high-speed sandblasting. In the UAE, PPF is not an accessory; it is the single most effective financial investment for preserving your vehicle's aesthetic and resale value. Our high-grade PPF absorbs the kinetic energy of stone chips, prevents sand abrasion from dulling the front bumper, and features a self-healing topcoat—meaning fine scratches and swirl marks literally disappear when parked in the hot Abu Dhabi sun.`,
            technicalProcess: `The vehicle undergoes an intensive decontamination wash and multi-stage paint correction to ensure the paint beneath the film is flawless. The computer-cut PPF panels are carefully laid over the vehicle using a specialized slip solution. Our master installers then meticulously squeegee the fluid out from under the film, stretching and tacking the polyurethane to conform perfectly to the complex aerodynamics of the ${brand.name}'s bodywork. The edges are carefully rolled and heat-sealed to prevent future lifting, resulting in seamless, invisible protection.`
        },
    }

    // Fallback content for services not in the map
    const defaultContent = {
        challenges: `${brand.name} vehicles incorporate ${specialties[0]} and ${specialties[1]} — highly advanced ${origin} engineering that requires specialized knowledge and extreme precision for proper ${service.name.toLowerCase()} procedures. Generic automotive workshops often severely lack the brand-specific factory training, proprietary software, and specialized physical tooling absolutely necessary to service modern ${brand.name} vehicles correctly. Using incorrect, non-approved fluids or ignoring critical factory service bulletins during maintenance can severely compromise the vehicle's long-term performance, safety, and reliability.`,
        approach: `At Smart Motor, we apply rigorous, uncompromising standards to every single service we perform on your ${brand.name}. Our master technicians are continuously trained on ${origin}-specific systems. We utilize dealer-level diagnostic equipment to ensure accurate, first-time repairs and execute all procedures strictly according to the manufacturer's official workshop manuals. We source and install only genuine or premium OEM-equivalent parts to maintain the exact structural and mechanical integrity that your vehicle possessed when it rolled off the assembly line.`,
        uaeContext: `The UAE climate presents brutal, unique challenges for any high-performance vehicle. The combination of extreme ambient heat, high coastal humidity, and ubiquitous, abrasive desert sand requires a highly proactive, localized approach to maintenance. We specifically tailor our service recommendations and intervals to mitigate the severe effects of the Abu Dhabi environment. By adapting ${origin} engineering requirements to Middle Eastern realities, we ensure your ${brand.name} remains highly reliable, safe, and performs optimally year-round in the desert heat.`,
        technicalProcess: `Every specialized service begins with a comprehensive visual and digital inspection of the vehicle's systems. We communicate our diagnostic findings transparently with detailed reports before any work commences. We proceed with the necessary repairs or maintenance using factory-approved methods, calibrated torque specifications, and OEM components. Finally, we conduct rigorous quality control checks and road tests to verify the integrity of the repair before returning your ${brand.name} to you in pristine condition.`
    }

    const uniqueContent = serviceContent[service.slug] || defaultContent

    return uniqueContent
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string, service: string }> }): Promise<Metadata> {
    const { slug, service: serviceSlug } = await params
    const allBrands = await adminGetAllBrands()
    const allServices = await adminGetAllServices()
    
    const brand = allBrands.find(b => b.slug === slug)
    const service = allServices.find(s => s.slug === serviceSlug)

    if (!brand || !service) return { title: 'Service Not Found' }

    const title = `Best ${brand.name} ${service.name} in Abu Dhabi UAE | Smart Motor`
    const description = `Certified ${brand.name} ${service.name} specialists in Musaffah, Abu Dhabi. Elite precision, OEM parts, and specialized UAE climate care. Book your ${brand.name} today.`

    return {
        title,
        description,
        keywords: `${brand.name} ${service.name} abu dhabi, ${brand.name} specialized repair uae, ${service.name} for ${brand.name}`,
        openGraph: {
            title,
            description,
            url: `https://smartmotor.ae/brand/${slug}/${serviceSlug}`,
            siteName: 'Smart Motor',
            type: 'website',
        },
        alternates: {
            canonical: `https://smartmotor.ae/brand/${slug}/${serviceSlug}`,
        },
    }
}

export async function generateStaticParams() {
    const [allBrands, allServices] = await Promise.all([
        adminGetAllBrands(),
        adminGetAllServices(),
    ])
    return allBrands.flatMap(brand =>
        allServices.map(service => ({
            slug: brand.slug,
            service: service.slug,
        }))
    )
}

export default async function BrandServicePage({ params }: { params: Promise<{ slug: string, service: string }> }) {
    const { slug, service: serviceSlug } = await params
    const allBrands = await adminGetAllBrands()
    const allServices = await adminGetAllServices()

    const brand = allBrands.find(b => b.slug === slug)
    const service = allServices.find(s => s.slug === serviceSlug)

    if (!brand || !service) notFound()

    const accentColor = BRAND_DATA[slug.toLowerCase()]?.accentColor || '#E62329'
    const brandData = BRAND_DATA[slug.toLowerCase()]
    const uniqueContent = getUniqueContent(brand, service, brandData)

    // Get other services for internal linking (exclude current service)
    const otherServices = allServices.filter(s => s.slug !== serviceSlug)

    // Get a few other brands for cross-brand linking
    const otherBrands = allBrands.filter(b => b.slug !== slug).slice(0, 6)

    const features = [
        { icon: Award, title: 'Brand Specialist', desc: `Certified ${brand.name} expertise` },
        { icon: Ruler, title: 'Precision Spec', desc: 'Manufacturer tolerances met' },
        { icon: Shield, title: 'UAE Warranty', desc: '12-month assurance' },
    ]

    // JSON-LD: Service + AutoRepair + FAQ structured data
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            {
                '@type': 'Service',
                '@id': `https://smartmotor.ae/brand/${slug}/${serviceSlug}#service`,
                name: `${brand.name} ${service.name}`,
                description: `Certified ${brand.name} ${service.name} specialists in Musaffah, Abu Dhabi. Elite precision, OEM parts, and specialized UAE climate care.`,
                url: `https://smartmotor.ae/brand/${slug}/${serviceSlug}`,
                serviceType: service.name,
                provider: {
                    '@type': 'AutomotiveBusiness',
                    '@id': 'https://smartmotor.ae/#organization',
                    name: 'Smart Motor Auto Repair',
                    url: 'https://smartmotor.ae',
                    telephone: '+97125555443',
                    address: {
                        '@type': 'PostalAddress',
                        streetAddress: 'M9, Musaffah Industrial Area',
                        addressLocality: 'Abu Dhabi',
                        addressRegion: 'Abu Dhabi',
                        addressCountry: 'AE',
                    },
                },
                areaServed: {
                    '@type': 'City',
                    name: 'Abu Dhabi',
                },
                brand: {
                    '@type': 'Brand',
                    name: brand.name,
                },
                offers: {
                    '@type': 'Offer',
                    priceCurrency: 'AED',
                    availability: 'https://schema.org/InStock',
                    url: `https://smartmotor.ae/brand/${slug}/${serviceSlug}`,
                },
                hasOfferCatalog: {
                    '@type': 'OfferCatalog',
                    name: `${brand.name} ${service.name} Services`,
                    itemListElement: [
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: `Full ${brand.name} system diagnostic report` } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'OEM genuine parts installation' } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'UAE-climate optimized lubricants and materials' } },
                        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Certified master technician sign-off' } },
                    ],
                },
            },
            {
                '@type': 'BreadcrumbList',
                itemListElement: [
                    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smartmotor.ae' },
                    { '@type': 'ListItem', position: 2, name: brand.name, item: `https://smartmotor.ae/brand/${slug}` },
                    { '@type': 'ListItem', position: 3, name: service.name, item: `https://smartmotor.ae/brand/${slug}/${serviceSlug}` },
                ],
            },
            {
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: `How much does ${brand.name} ${service.name} cost in Abu Dhabi?`,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: `${brand.name} ${service.name} pricing at Smart Motor varies by model and condition. We provide transparent estimates before any work begins, with no hidden fees. Contact us for a free inspection and quote.`,
                        },
                    },
                    {
                        '@type': 'Question',
                        name: `Do you use genuine OEM parts for ${brand.name} vehicles?`,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: `Yes, Smart Motor exclusively uses 100% genuine OEM parts for all ${brand.name} repairs and services. This ensures factory-grade performance and preserves your warranty.`,
                        },
                    },
                    {
                        '@type': 'Question',
                        name: `What warranty do you offer on ${brand.name} ${service.name}?`,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: `All ${brand.name} ${service.name} work at Smart Motor comes with a 6-month or 10,000km warranty on labor. Parts are covered under manufacturer warranty terms.`,
                        },
                    },
                    {
                        '@type': 'Question',
                        name: `Where is Smart Motor located for ${brand.name} service?`,
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text: `Smart Motor is located in M9, Musaffah Industrial Area, Abu Dhabi. We serve customers from across Abu Dhabi, Khalifa City, Al Reem Island, and surrounding areas. Free pickup is available.`,
                        },
                    },
                ],
            },
        ],
    }

    return (
        <main className="min-h-screen bg-brand-bg">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Navbar />

            {/* ── SEO Header ─────────────────────────────────────────────────── */}
            <section className="relative pt-48 pb-32 overflow-hidden bg-[#0A0A0A]">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full blur-[160px] opacity-10" style={{ background: accentColor }} />
                    <div className="absolute inset-0 micro-noise opacity-5" />
                </div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center lg:text-left">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                <ShieldCheck size={14} className="text-brand-red" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-white/60">{brand.name} Elite Care</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase italic leading-[0.85] text-white">
                                {service.name} <br />
                                <span style={{ color: accentColor }}>for {brand.name}</span>
                            </h1>
                            <p className="text-white/40 text-lg lg:text-xl font-medium tracking-wide max-w-2xl">
                                Abu Dhabi&apos;s premier technical hub for specialized {brand.name} maintenance. 
                                Precision engineering meets Musaffah&apos;s most elite workshop.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[3rem] text-center lg:text-left">
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-red mb-2">Service Standard</p>
                            <p className="text-2xl font-black text-white italic mb-6">UAE FIRST-CLASS</p>
                            <Link
                                href="/#booking"
                                className="inline-flex items-center gap-2 bg-brand-red text-white rounded-full px-10 py-5 text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
                            >
                                Book Inspection
                                <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Feature Grid ───────────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((f) => (
                            <div key={f.title} className="p-10 bg-brand-bg rounded-[2.5rem] border border-gray-100 group hover:border-brand-red/20 transition-all duration-500">
                                <f.icon className="text-brand-red mb-6" size={32} />
                                <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter mb-2 italic">{f.title}</h3>
                                <p className="text-gray-500 font-medium text-sm leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Deep Content (UNIQUE per brand×service) ─────────────────────── */}
            <section className="py-24 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                        <div className="lg:col-span-7 space-y-8">
                            <h2 className="text-4xl font-black tracking-tighter uppercase italic text-brand-dark">
                                {brand.name} {service.name} <br /><span className="silver-shine">in Abu Dhabi</span>
                            </h2>

                            <div className="prose prose-lg text-gray-600 font-medium leading-relaxed">
                                <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter italic">The Challenge</h3>
                                <p>{uniqueContent.challenges}</p>

                                <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter italic mt-8">Our Approach</h3>
                                <p>{uniqueContent.approach}</p>

                                <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter italic mt-8">Why It Matters in Abu Dhabi</h3>
                                <p>{uniqueContent.uaeContext}</p>
                                
                                {uniqueContent.technicalProcess && (
                                    <>
                                        <h3 className="text-xl font-black text-brand-dark uppercase tracking-tighter italic mt-8">The Technical Process</h3>
                                        <p>{uniqueContent.technicalProcess}</p>
                                    </>
                                )}
                            </div>
                            
                            <ul className="space-y-4 pt-6">
                                {[
                                    `Full ${brand.name} system diagnostic report`,
                                    'OEM genuine parts installation',
                                    'UAE-climate optimized lubricants and materials',
                                    'Certified master technician sign-off'
                                ].map(item => (
                                    <li key={item} className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-brand-dark">
                                        <div className="w-2 h-2 rounded-full bg-brand-red" />
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            {/* External authority link to manufacturer */}
                            {brandData?.website && (
                                <p className="text-sm text-gray-500 font-medium pt-4">
                                    Learn more about {brand.name} vehicle specifications on the{' '}
                                    <a href={brandData.website} target="_blank" rel="noopener noreferrer" className="text-brand-red hover:underline font-bold">
                                        official {brand.name} website
                                    </a>.
                                </p>
                            )}
                        </div>

                        <div className="lg:col-span-5">
                            <div className="aspect-square bg-white rounded-[4rem] p-1 shadow-2xl border border-gray-100 overflow-hidden group">
                                <div className="w-full h-full rounded-[3.8rem] overflow-hidden relative">
                                    <img 
                                        src={service.image || '/bg-placeholder.jpg'} 
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                                        alt={`Professional ${brand.name} ${service.name} being performed at Smart Motor workshop in Musaffah Abu Dhabi`}
                                    />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Other Services for this Brand (Internal Linking) ─────────── */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-brand-dark mb-4">
                        Other <span className="text-brand-red">{brand.name}</span> Services
                    </h2>
                    <p className="text-gray-500 font-medium mb-12 max-w-2xl">
                        We offer comprehensive care for your {brand.name}. Explore our full range of specialized services.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {otherServices.slice(0, 8).map(s => (
                            <Link
                                key={s.slug}
                                href={`/brand/${slug}/${s.slug}`}
                                className="group p-6 bg-brand-bg rounded-2xl border border-gray-100 hover:border-brand-red/30 transition-all duration-300"
                            >
                                <h3 className="text-sm font-black text-brand-dark uppercase tracking-tight group-hover:text-brand-red transition-colors">
                                    {s.name}
                                </h3>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-2">
                                    {brand.name} Specialist
                                </p>
                                <ArrowRight size={14} className="text-gray-300 group-hover:text-brand-red mt-3 group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))}
                    </div>
                    {otherServices.length > 8 && (
                        <div className="mt-8 text-center">
                            <Link
                                href={`/brand/${slug}`}
                                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-red hover:text-brand-dark transition-colors"
                            >
                                View All {brand.name} Services
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* ── Same Service, Other Brands (Cross-brand Internal Linking) ── */}
            <section className="py-20 bg-brand-bg">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase italic text-brand-dark mb-4">
                        <span className="text-brand-red">{service.name}</span> for Other Brands
                    </h2>
                    <p className="text-gray-500 font-medium mb-12 max-w-2xl">
                        Smart Motor provides expert {service.name.toLowerCase()} for all major vehicle brands in Abu Dhabi.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {otherBrands.map(b => (
                            <Link
                                key={b.slug}
                                href={`/brand/${b.slug}/${serviceSlug}`}
                                className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full border border-gray-100 hover:border-brand-red/30 text-sm font-black text-brand-dark uppercase tracking-tight hover:text-brand-red transition-all group"
                            >
                                {b.logoUrl && (
                                    <img src={b.logoUrl} alt={`${b.name} ${service.name} Abu Dhabi`} className="w-5 h-5 object-contain" />
                                )}
                                {b.name}
                                <ChevronRight size={12} className="text-gray-300 group-hover:text-brand-red transition-colors" />
                            </Link>
                        ))}
                        <Link
                            href="/services"
                            className="inline-flex items-center gap-2 px-5 py-3 bg-brand-red text-white rounded-full text-sm font-black uppercase tracking-tight hover:bg-brand-dark transition-all"
                        >
                            All Services
                            <ArrowRight size={12} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── UAE Authority Resources ─────────────────────────────────────── */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <h3 className="text-sm font-black text-brand-dark uppercase tracking-widest mb-6">Helpful UAE Resources</h3>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-gray-500">
                        <a href="https://www.moi.gov.ae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                            UAE Ministry of Interior
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="https://dot.abudhabi.ae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                            Abu Dhabi Dept. of Transport
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="https://u.ae/en/information-and-services/justice-safety-and-the-law/road-safety/traffic-fines-and-violations" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                            UAE Traffic Fines & Violations
                        </a>
                        <span className="text-gray-300">|</span>
                        <a href="https://www.moiat.gov.ae" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition-colors">
                            ESMA Vehicle Standards
                        </a>
                        <span className="text-gray-300">|</span>
                        <Link href="/hub/traffic-fines" className="hover:text-brand-red transition-colors">
                            Smart Motor Traffic Fines Guide
                        </Link>
                        <span className="text-gray-300">|</span>
                        <Link href="/hub/regulations" className="hover:text-brand-red transition-colors">
                            UAE Vehicle Regulations
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Dynamic Leyla Integration ──────────────────────────────────── */}
            <section className="py-24 bg-brand-dark relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full blur-[120px] opacity-10" style={{ background: accentColor }} />
                
                <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
                    <div className="w-20 h-20 bg-brand-red rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-2xl rotate-12">
                        <Wrench className="text-white" size={32} />
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic mb-6">
                        Leyla&apos;s Expert Directive: <br />
                        <span className="text-brand-red">{brand.name} Performance</span>
                    </h3>
                    <p className="text-white/60 text-lg font-medium leading-relaxed max-w-3xl mx-auto mb-12">
                        &quot;For {brand.name} owners in Abu Dhabi, {service.name} isn&apos;t just maintenance—it&apos;s insurance against the heat. 
                        I recommend a full check every summer transition to ensure your {brand.name}&apos;s precision cooling and protection systems are 100% efficient.&quot;
                    </p>
                    <Link
                        href="/leyla"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-white text-brand-dark rounded-full font-black uppercase tracking-widest text-xs hover:bg-brand-red hover:text-white transition-all shadow-2xl group"
                    >
                        Talk to Leyla for More
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>

            <Footer />
        </main>
    )
}
