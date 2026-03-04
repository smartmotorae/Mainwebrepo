import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { verifyAdminSession } from '@/lib/auth-utils'
import admin from 'firebase-admin'

export const dynamic = 'force-dynamic'

const BLOG_POSTS = [
    {
        type: 'BLOG',
        slug: 'toyota-land-cruiser-ac-compressor-replacement-abu-dhabi',
        title: 'Toyota Land Cruiser AC Compressor Replacement in Abu Dhabi',
        category: 'Toyota',
        image: '/brands/png/toyota.png',
        excerpt: 'Is your Land Cruiser AC blowing warm air in Abu Dhabi summer? Learn about AC compressor failure symptoms, replacement costs, and why UAE heat destroys compressors faster than anywhere else.',
        content: `# Toyota Land Cruiser AC Compressor Replacement in Abu Dhabi

A functioning AC system in Abu Dhabi isn't a luxury — it's a survival requirement. When your Toyota Land Cruiser's AC starts blowing warm air in 50°C heat, you need a workshop that understands exactly why Land Cruiser compressors fail in the UAE and how to fix them properly.

## Why Land Cruiser AC Compressors Fail in Abu Dhabi

The Toyota Land Cruiser is one of the most popular vehicles on UAE roads, and for good reason — it's built tough. But even Toyota's legendary reliability has limits when it comes to Abu Dhabi's extreme climate.

**The root cause:** Your Land Cruiser's AC compressor was engineered in Japan for a global market. In European or North American conditions, a compressor typically lasts 150,000-200,000 km. In Abu Dhabi, we routinely see failures at 80,000-120,000 km. The reason is simple — your AC runs at maximum capacity for 8-9 months of the year, compared to 3-4 months in temperate climates. That's double the operational stress.

**Common symptoms we see at Smart Motor:**
- AC blows cool but not cold (gradual compressor wear)
- Clicking or grinding noise when AC engages (clutch bearing failure)
- AC works intermittently — cold, then warm, then cold again (thermal expansion issues)
- Complete AC failure with no cold air at all (compressor seizure)
- Refrigerant leak at the compressor shaft seal (heat-accelerated seal degradation)

## What the Repair Involves

At Smart Motor, every Land Cruiser AC compressor replacement follows a systematic protocol:

**Step 1 — Diagnosis (not assumption).** We never replace a compressor based on symptoms alone. Our technicians perform a full AC system pressure test, leak detection using UV dye and electronic sniffers, and compressor clutch engagement testing. In approximately 15% of cases, what appears to be compressor failure is actually a condenser blockage, expansion valve fault, or electrical relay issue — saving the customer thousands of dirhams.

**Step 2 — System flush.** When a compressor fails, metal debris circulates through the entire AC circuit. If you install a new compressor without flushing the system, those particles will destroy the replacement within months. We flush every line, replace the receiver-drier, and clean or replace the expansion valve.

**Step 3 — OEM compressor installation.** We use genuine Denso compressors (Toyota's OEM supplier) or equivalent-quality Sanden units. Generic aftermarket compressors from unknown manufacturers have a significantly higher failure rate in UAE conditions.

**Step 4 — Vacuum and charge.** The system is evacuated to remove all moisture (critical in Abu Dhabi's humid coastal air), then charged with the exact factory-specified quantity of R-134a or R-1234yf refrigerant, depending on your Land Cruiser model year.

**Step 5 — Performance verification.** We measure vent temperature, high/low side pressures, and compressor amperage draw against Toyota's factory specifications before returning the vehicle.

## Cost Guidance

Toyota Land Cruiser AC compressor replacement at Smart Motor typically falls in the AED 2,500 - 4,500 range depending on your model year (V8 vs. V6, 200-series vs. 300-series) and whether you choose genuine Toyota or OEM-equivalent parts. This includes the compressor, receiver-drier, system flush, refrigerant, and labor.

## How to Extend Your AC Compressor's Life in Abu Dhabi

1. **Don't blast the AC immediately** when starting the car. Drive for 30 seconds with windows cracked to let the superheated cabin air escape before closing up and turning AC to max.
2. **Run the AC for 10 minutes weekly** even in winter months. This keeps the compressor seals lubricated and prevents refrigerant migration.
3. **Have your condenser fins cleaned annually.** Sand and dust buildup reduces heat dissipation, forcing the compressor to work harder.
4. **Check refrigerant levels before summer.** A system that's 20% low makes the compressor work 40% harder.

## Book Your Land Cruiser AC Inspection

If your Land Cruiser's AC isn't performing as it should, don't wait until it fails completely in the middle of summer. Smart Motor offers free AC health checks for Toyota vehicles — we'll measure your system pressures, check for leaks, and give you a transparent assessment before any work begins.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443 | Mon-Sat 08:00-19:00`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
    {
        type: 'BLOG',
        slug: 'bmw-x5-coolant-leak-repair-abu-dhabi',
        title: 'BMW X5 Coolant Leak Repair — Common Causes and Fix in Abu Dhabi',
        category: 'BMW',
        image: '/brands/png/bmw.png',
        excerpt: 'BMW X5 coolant leaks are one of the most common issues we see in Abu Dhabi. Learn about the typical failure points, warning signs, and why ignoring a small leak leads to catastrophic engine damage.',
        content: `# BMW X5 Coolant Leak Repair — Common Causes and Fix in Abu Dhabi

The BMW X5 is one of Abu Dhabi's most popular luxury SUVs, and for good reason — it combines German engineering precision with the road presence that UAE drivers love. But there's one problem that brings X5 owners to our workshop more than any other: coolant leaks.

## Why BMW X5 Coolant Systems Fail in Abu Dhabi

BMW cooling systems are engineered with a mix of plastic and aluminum components — a design philosophy that reduces weight and improves fuel efficiency in German driving conditions. In Abu Dhabi, this engineering choice becomes a vulnerability.

**The physics:** Plastic expands and contracts with heat cycles. In Germany, your X5 might see temperature swings of 20-30°C between cold start and operating temperature. In Abu Dhabi, the swing can be 40-50°C (ambient 50°C + engine bay heat vs. overnight cooling). Over thousands of cycles, plastic components develop micro-cracks that eventually become full leaks.

**The top 5 BMW X5 coolant leak points we repair at Smart Motor:**

1. **Coolant expansion tank** (most common) — The pressurized plastic tank develops hairline cracks, often at the seam or around the level sensor. You'll notice a sweet smell under the hood and a low coolant warning.

2. **Upper radiator hose connector** — The plastic quick-connect fitting where the hose meets the radiator becomes brittle and snaps. This can cause a sudden, complete coolant loss.

3. **Electric water pump** (N55 and B58 engines) — BMW pioneered electric water pumps for efficiency. The pump housing seal degrades in extreme heat, causing a slow weep that becomes a stream.

4. **Valve cover gasket** — On the N55 engine (2014-2018 X5), the integrated valve cover gasket can leak coolant into the oil (not just oil externally). This is serious and requires immediate attention.

5. **Thermostat housing** — The aluminum-to-plastic thermostat housing junction is a known weak point, particularly on the N63 V8 engine used in the X5 50i.

## Warning Signs You Shouldn't Ignore

- **Low coolant warning on iDrive** — Don't just top up and forget. Find the leak.
- **White steam from under the hood** — Coolant is contacting the hot exhaust manifold.
- **Sweet smell inside or outside the car** — Ethylene glycol (coolant) has a distinctive sweet odor.
- **Temperature gauge climbing above center** — Your X5 should sit at dead center. Anything above indicates reduced cooling capacity.
- **Milky residue on the oil filler cap** — Coolant is mixing with oil. Stop driving immediately.

## The Smart Motor BMW Coolant System Repair Process

**Pressure test first.** We pressurize the cooling system to 2.0 bar (BMW specification) with the engine cold, then inspect every component with UV dye and visual inspection. This identifies ALL leak points — not just the most obvious one.

**We replace in sets, not singles.** If your expansion tank has failed, the upper hoses are likely next. We recommend replacing the tank, all plastic connectors, and the thermostat housing as a preventive set. This costs slightly more upfront but prevents a second failure 6 months later.

**Genuine BMW coolant only.** BMW cooling systems use a specific blue-green coolant (BMW Antifreeze/Coolant, part number 83-19-2-211-191). Mixing generic green or orange coolant causes silicate gel formation that blocks the heater core and radiator passages. We've seen this mistake cause AED 8,000+ in damage.

**Air bleed procedure.** BMW cooling systems are notoriously difficult to bleed properly. Air pockets cause hot spots that accelerate component failure. We use BMW's factory bleed procedure with the DME-controlled electric water pump cycling — not the "run it with the cap off" method that generic workshops use.

## Cost Guidance

| Repair | Typical Range (AED) |
|--------|-------------------|
| Expansion tank replacement | 800 - 1,200 |
| Electric water pump | 2,000 - 3,500 |
| Full cooling system overhaul (tank + pump + thermostat + hoses) | 4,500 - 7,000 |
| Valve cover with integrated gasket (N55) | 3,000 - 4,500 |

## Prevention in Abu Dhabi

1. **Inspect coolant level monthly** — especially May through October
2. **Replace coolant every 4 years or 80,000 km** — not "lifetime" as BMW suggests (that applies to European conditions)
3. **Have a cooling system pressure test annually** — catches micro-leaks before they strand you
4. **Use a garage or shade** whenever possible — reduces thermal cycling stress

## Book Your BMW X5 Cooling System Inspection

A small coolant leak today becomes a warped cylinder head tomorrow. At Smart Motor, we provide free cooling system visual inspections for all BMW models. If we find a concern, we'll show you exactly what's leaking, explain the repair options, and give you a transparent quote before any work begins.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
    {
        type: 'BLOG',
        slug: 'range-rover-sport-air-suspension-failure-abu-dhabi',
        title: 'Range Rover Sport Air Suspension Failure — Diagnosis and Repair in Abu Dhabi',
        category: 'Land Rover',
        image: '/brands/png/land-rover.png',
        excerpt: 'Range Rover Sport sagging on one corner or showing suspension fault warnings? Air suspension failure is the most common Range Rover problem in Abu Dhabi. Here is what causes it and how we fix it.',
        content: `# Range Rover Sport Air Suspension Failure — Diagnosis and Repair in Abu Dhabi

If you own a Range Rover Sport in Abu Dhabi, there's a near-certainty that you'll encounter an air suspension issue at some point. It's not a question of if — it's a question of when. At Smart Motor, Range Rover air suspension repairs account for a significant portion of our Land Rover workload, and we've developed a deep expertise in diagnosing and resolving these issues efficiently.

## How Range Rover Air Suspension Works

The Range Rover Sport uses an electronic air suspension (EAS) system that replaces conventional steel springs with air-filled rubber bellows (air springs) at each corner. A compressor fills these bellows with pressurized air, and height sensors at each corner tell the control module how high the vehicle is sitting. The system can raise the vehicle for off-road clearance, lower it at highway speeds for better aerodynamics, and automatically level the vehicle when loaded.

It's a brilliant system when it works. When it doesn't, your Range Rover either sags to one side, drops to its bump stops overnight, or displays the dreaded "Suspension Fault — Normal Height Only" warning.

## Why Air Suspension Fails Faster in Abu Dhabi

**Heat degrades rubber.** The air spring bladders are made of reinforced rubber. In the UAE, under-vehicle temperatures can exceed 70°C when driving on sun-baked asphalt. This accelerates rubber perishing, causing the bladders to develop micro-cracks that leak air slowly at first, then rapidly.

**Sand acts as an abrasive.** Fine desert sand gets into the air spring folds and acts like sandpaper against the rubber every time the suspension cycles. This is a problem unique to the Middle East and Gulf region.

**The compressor overworks.** When one air spring develops a slow leak, the compressor runs overtime to compensate. In Abu Dhabi heat, this thermal overload causes the compressor's thermal cutout to trip — which is why many owners experience the car dropping overnight (compressor overheated and shut down, air continued leaking).

## The 5 Most Common Range Rover Sport Air Suspension Failures

1. **Air spring bladder leak** (60% of cases) — Rubber degradation at the crimped connection point or along the fold line. Usually affects rear springs first.

2. **Compressor failure** (20% of cases) — The Hitachi compressor's piston rings wear, reducing output pressure. Or the relay/thermal fuse fails from overwork.

3. **Valve block failure** (10% of cases) — The central valve block directs air to each corner. Internal O-ring seals dry out in UAE heat and allow cross-leaking between circuits.

4. **Height sensor damage** (5% of cases) — The plastic linkage arm connecting the sensor to the suspension lower arm snaps from heat embrittlement or impact.

5. **Air line fitting leak** (5% of cases) — The push-fit nylon air lines develop leaks at their connection points, especially where they route near heat sources.

## Our Diagnostic Process

**Step 1 — Live data scan.** We connect to the vehicle's air suspension module using JLR-approved diagnostic equipment and read live data: compressor run time, individual corner heights, target vs. actual heights, and fault codes. This tells us immediately whether the issue is mechanical (leak) or electronic (sensor/module).

**Step 2 — Leak-down test.** With the vehicle raised to maximum height, we monitor pressure drop at each corner over 15 minutes. A healthy system holds within 5mm. Anything beyond that indicates a leak.

**Step 3 — Soapy water and UV dye.** For air springs and lines, visual inspection with soapy water identifies the exact leak point. For slow leaks, we add UV dye to the system and re-inspect after 24 hours under UV light.

**Step 4 — Compressor output test.** We measure the compressor's flow rate and maximum pressure against factory specifications (typically 15-17 bar). A worn compressor might still run but can't build sufficient pressure to lift the vehicle.

## Repair Options

**Option 1 — OEM air spring replacement.** Genuine Dunlop or Continental air springs (Land Rover OEM suppliers). This is the gold-standard repair that restores factory ride quality and longevity. We recommend replacing in pairs (both rears or both fronts) since the surviving spring is likely at the same stage of degradation.

**Option 2 — Quality aftermarket air springs.** Brands like Arnott manufacture direct-replacement air springs with improved rubber compounds and reinforced crimping. These can actually outlast OEM in UAE conditions due to the heat-resistant rubber compound formulation. We've had excellent results with these.

**Option 3 — Compressor rebuild or replacement.** For compressor failures, we can rebuild with new piston rings and valve plates, or replace with a new unit. A new compressor without fixing the underlying air spring leak is a waste of money — the new compressor will burn out for the same reason.

## Cost Guidance

| Component | Typical Range (AED) |
|-----------|-------------------|
| Single air spring (rear) | 1,800 - 3,000 |
| Pair of rear air springs | 3,200 - 5,500 |
| Air compressor replacement | 2,500 - 4,000 |
| Valve block rebuild | 1,500 - 2,500 |
| Complete system overhaul (4 springs + compressor + valve block) | 10,000 - 16,000 |

## Prevention Tips for Abu Dhabi Range Rover Owners

1. **Don't ignore the early signs.** If your Range Rover sits slightly low on one corner in the morning, it has a slow leak. Fix it now before the compressor burns out trying to compensate.
2. **Wash the underside regularly.** Remove sand from the air spring folds — this significantly extends bladder life.
3. **Park in shade or a garage** when possible. Reducing heat exposure extends every rubber component in the vehicle.
4. **Annual suspension health check.** We can measure air spring leak rates before they become a problem.

## Book Your Range Rover Suspension Inspection

Range Rover air suspension problems don't fix themselves — they only get worse (and more expensive). At Smart Motor, our Land Rover specialists will diagnose your suspension system, show you exactly what's failing, and present repair options from budget-conscious to factory-standard.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443 | Mon-Sat 08:00-19:00`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
    {
        type: 'BLOG',
        slug: 'mercedes-glc-300-major-service-cost-abu-dhabi',
        title: 'Mercedes GLC 300 Major Service — What Is Included and Cost in Abu Dhabi',
        category: 'Mercedes',
        image: '/brands/png/mercedes-benz.png',
        excerpt: 'Due for your Mercedes GLC 300 major service in Abu Dhabi? Learn exactly what is included, how much it should cost, and why dealer-alternative workshops deliver the same quality for less.',
        content: `# Mercedes GLC 300 Major Service — What Is Included and Cost in Abu Dhabi

The Mercedes GLC 300 is one of the best-selling luxury SUVs in Abu Dhabi, and like every precision-engineered Mercedes, it requires scheduled maintenance to perform at its best. If your MBUX display is showing a Service B due notification, or you've crossed 60,000 km since your last major service, this guide explains exactly what's involved and what it should cost.

## What Is a Mercedes GLC 300 Major Service?

Mercedes uses a flexible service system called ASSYST PLUS (Active Service System) that monitors your driving patterns, mileage, and engine conditions to determine when service is due. The system alternates between:

- **Service A (Minor):** Oil change, filter, and basic inspection — typically at 15,000-20,000 km intervals
- **Service B (Major):** Comprehensive fluid replacement, filter changes, and detailed inspection — typically at 30,000-40,000 km intervals, or every 2 years

In Abu Dhabi, we recommend Service B every 30,000 km rather than the 40,000 km European interval, because the extreme heat accelerates fluid degradation significantly.

## What's Included in Our GLC 300 Major Service

### Fluids and Filters
- **Engine oil and filter** — Mercedes-approved MB 229.51 or 229.71 specification synthetic oil (typically Mobil 1 ESP 5W-30 or equivalent). The GLC 300's M264 2.0-liter turbo requires exactly 5.5 liters.
- **Air filter replacement** — Critical in Abu Dhabi where sand particles are present year-round
- **AC cabin filter** — Activated carbon type that removes sand, dust, and odors. We recommend replacement every service in the UAE (vs. every other service in Europe)
- **Fuel filter inspection** — Replaced if flow rate is below specification
- **Spark plug replacement** — Every 60,000 km on the M264 engine (uses NGK or Bosch iridium plugs)

### Brake System
- **Brake fluid replacement** — DOT 4+ specification. Brake fluid absorbs moisture from the air, and Abu Dhabi's coastal humidity means your brake fluid reaches its boiling point degradation threshold faster than in dry climates
- **Brake pad thickness measurement** — All four corners, measured with digital caliper against Mercedes minimum specifications (3mm front, 2mm rear)
- **Brake disc inspection** — Checking for scoring, lip formation, and minimum thickness

### Transmission
- **9G-TRONIC transmission fluid level check** — Mercedes calls this a "sealed for life" transmission, but we strongly recommend a fluid change at 60,000 km in UAE conditions. The 9-speed automatic runs hotter in Abu Dhabi traffic, and degraded ATF causes harsh shifts.

### Cooling System
- **Coolant concentration test** — Using a refractometer to verify the glycol-to-water ratio is correct for Abu Dhabi conditions (typically 50:50, providing protection to -37°C and boilover protection to +108°C)
- **Cooling system pressure test** — Checks for leaks in the plastic expansion tank, hoses, and water pump seal

### Electrical and Safety
- **Battery health test** — AGM battery conductance and voltage test. Abu Dhabi heat is the number one killer of car batteries — average lifespan here is 2-3 years vs. 5-6 years in Europe
- **Wiper blade condition** — Replaced if streaking (critical for the brief but intense UAE rainy season)
- **All exterior and interior lighting check**
- **Tire condition and pressure** — Including the TPMS sensor battery check

### Inspection (Visual and Road Test)
- **Suspension component inspection** — Checking all bushings, ball joints, and anti-roll bar links for play or deterioration
- **Drive belt inspection** — Checking for cracking, glazing, or stretch
- **Exhaust system inspection** — Checking for leaks, corrosion, and catalyst efficiency
- **Road test** — Verifying smooth shifting, no vibrations, proper steering alignment feel, and braking performance

### Digital
- **Service reset via XENTRY** — We use Mercedes XENTRY diagnostic equipment (the same system authorized dealers use) to reset the service counter, read and clear any stored fault codes, and verify all systems are operating within parameters
- **Digital vehicle health report** — You receive a detailed PDF report with photographs of every inspection point

## What This Costs at Smart Motor

| Service Level | Typical Range (AED) |
|--------------|-------------------|
| Service B (Major) — standard items | 1,800 - 2,500 |
| Service B + spark plugs (60k km) | 2,400 - 3,200 |
| Service B + transmission fluid | 3,000 - 4,200 |
| Service B + brake fluid + all filters + spark plugs | 3,200 - 4,500 |

These prices include all parts, fluids, and labor. No hidden fees — we provide a detailed estimate before any work begins, and you approve every item.

**For comparison:** The same Service B at an authorized Mercedes dealer in Abu Dhabi typically costs AED 3,500 - 6,000+. We deliver identical service quality using the same parts and diagnostic equipment, at a lower cost because our overheads are lower.

## Why Choose a Dealer Alternative for Mercedes Service?

Your Mercedes warranty is protected by UAE Consumer Protection Law. Independent workshops that use genuine or OEM-equivalent parts and follow manufacturer procedures cannot void your warranty. This is a common misconception — the manufacturer must prove that the independent service caused a failure, not simply that independent service was performed.

At Smart Motor, our Mercedes technicians use:
- Mercedes-approved specification oils and fluids
- Genuine or OEM-equivalent filters and parts (Mahle, Mann, Bosch — the same companies that make "genuine" Mercedes parts)
- XENTRY diagnostic equipment for service resets and fault reading
- Mercedes service documentation (WIS/ASRA) for torque specifications and procedures

## Book Your GLC 300 Major Service

Don't wait for the service light to become an overdue warning. Regular maintenance is the single most cost-effective thing you can do for your Mercedes. Smart Motor offers convenient pickup and delivery service across Abu Dhabi — we collect your GLC, service it, and return it to you the same day.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443 | Mon-Sat 08:00-19:00`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
    {
        type: 'BLOG',
        slug: 'nissan-patrol-v8-transmission-service-abu-dhabi',
        title: 'Nissan Patrol V8 Transmission Service — When and Why in Abu Dhabi',
        category: 'Nissan',
        image: '/brands/png/nissan.png',
        excerpt: 'Your Nissan Patrol V8 automatic transmission needs regular fluid changes in Abu Dhabi — even though the manual says otherwise. Learn when to service it and what happens if you do not.',
        content: `# Nissan Patrol V8 Transmission Service — When and Why in Abu Dhabi

The Nissan Patrol Y62 with the 5.6-liter V8 is an Abu Dhabi icon. It's the UAE's unofficial national vehicle — you'll find one in almost every neighbourhood. But there's a maintenance item that most Patrol owners neglect until it becomes a very expensive problem: the automatic transmission fluid.

## The "Lifetime Fluid" Myth

Nissan's official service manual for the Patrol Y62 describes the RE7R01A 7-speed automatic transmission fluid as "lifetime fill" — meaning they don't schedule a replacement interval. This recommendation works fine in Japan, where average temperatures are moderate and the transmission is rarely stressed.

In Abu Dhabi, "lifetime" translates to "the lifetime of the transmission" — which, without fluid changes, can be as short as 120,000 km.

**Here's what happens:** Automatic transmission fluid (ATF) degrades through three mechanisms:
1. **Thermal breakdown** — Every 10°C above the designed operating temperature halves the fluid's effective life. Your Patrol's transmission runs 20-30°C hotter in Abu Dhabi traffic than it would in Japanese driving conditions.
2. **Oxidation** — Heat causes the fluid to oxidize, forming varnish deposits that coat the valve body and solenoids, causing delayed or harsh shifts.
3. **Friction material contamination** — The transmission's clutch packs shed microscopic particles into the fluid. Fresh ATF suspends these particles and carries them to the filter. Degraded fluid drops them, allowing buildup on critical surfaces.

## When We Recommend Transmission Service

At Smart Motor, our recommendation for Nissan Patrol V8 transmission service in Abu Dhabi:

| Driving Pattern | Recommended Interval |
|----------------|---------------------|
| City driving (Abu Dhabi traffic) | Every 60,000 km |
| Highway primarily (Abu Dhabi to Dubai commute) | Every 80,000 km |
| Off-road / desert driving | Every 40,000 km |
| Towing (boats, trailers) | Every 40,000 km |

If your Patrol has over 100,000 km and has never had a transmission fluid change, it needs one now — but with a specific approach (see below).

## What Our Patrol Transmission Service Includes

### Standard Service (under 100,000 km)
- **Drain and refill** — We drain approximately 5 liters of the total 10-liter capacity through the drain plug, then refill with Nissan-specification Matic S ATF (or equivalent Aisin Warner-approved fluid)
- **Pan inspection** — We remove the transmission pan to inspect for excessive metal particles on the magnet. A small amount of fine grey dust is normal. Chunks or glitter indicate internal wear that needs further investigation.
- **Filter replacement** — The internal transmission filter is replaced to ensure clean fluid flow to the valve body
- **Fluid level adjustment** — ATF level must be checked at the precise temperature specified by Nissan (fluid temperature at 40-50°C, measured with diagnostic scan tool, not the dipstick alone)
- **Adaptation reset** — Using Nissan CONSULT III diagnostic equipment, we reset the transmission's adaptive learning parameters so it relearns shift points with the fresh fluid

### High-Mileage Service (over 100,000 km, first-time fluid change)
For Patrols that have never had a fluid change beyond 100,000 km, we take a more cautious approach:

- **We do NOT perform a full flush.** A full power flush on a neglected transmission can dislodge accumulated deposits and cause them to block the valve body — making the problem worse. This is a common mistake at quick-service workshops.
- Instead, we perform a **drain-and-fill only** (replacing approximately 50% of the fluid), then drive the vehicle for 500 km and repeat. This gradually dilutes the degraded fluid over two visits, giving the detergent additives in the new fluid time to safely dissolve deposits without sudden dislodgment.

## Warning Signs Your Patrol Transmission Needs Attention

- **Delayed engagement** — You shift to D or R and there's a 2-3 second pause before the car moves. This is the most common early symptom of degraded fluid.
- **Harsh 2-3 shift** — A firm "thunk" between second and third gear, especially when the transmission is cold. Caused by sticky solenoids from varnished fluid.
- **Shudder at low speed** — A vibration felt through the floor during light acceleration at 40-60 km/h. Often mistaken for a driveshaft issue, but usually caused by worn torque converter clutch friction material contaminating the fluid.
- **Transmission temperature warning** — If you see this on your dashboard, pull over safely. Continuing to drive with an overheating transmission causes permanent damage within minutes.

## Cost Guidance

| Service | Typical Range (AED) |
|---------|-------------------|
| Standard drain-and-fill with filter | 1,200 - 1,800 |
| Two-stage high-mileage service | 2,000 - 2,800 |
| Valve body repair (if damage found) | 3,500 - 6,000 |
| Full transmission rebuild (worst case) | 12,000 - 18,000 |

The message is clear: AED 1,500 in preventive maintenance every 60,000 km prevents an AED 15,000 rebuild at 150,000 km.

## Desert Driving and Your Transmission

Many Patrol owners in Abu Dhabi enjoy weekend desert trips. Desert driving is extremely demanding on the transmission:
- **Sand driving** keeps the torque converter in constant slip, generating enormous heat
- **Dune climbing** subjects the transmission to maximum torque at low speed — the worst possible thermal condition
- **Tire deflation** changes the final drive ratio, causing the transmission to operate outside its optimized shift map

If you desert drive regularly, consider installing an **aftermarket transmission cooler**. We fit high-capacity transmission oil coolers that reduce operating temperatures by 15-20°C — a modification that can double the effective life of your transmission fluid and components.

## Book Your Patrol Transmission Service

Whether your Patrol has 50,000 km or 200,000 km, our Nissan specialists will assess your transmission's current condition and recommend the appropriate service level. We provide a transparent quote, genuine Nissan-specification fluids, and diagnostic-verified results.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443 | Mon-Sat 08:00-19:00`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
]

export async function POST(req: Request) {
    try {
        const session = await verifyAdminSession()
        if (!session || session.role !== 'admin') {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        const db = getAdminDb()
        if (!db) {
            return NextResponse.json({ error: 'Database not initialized' }, { status: 500 })
        }

        const results: { slug: string; id: string; status: string }[] = []

        for (const post of BLOG_POSTS) {
            try {
                // Check if post with this slug already exists
                const existing = await db.collection('content')
                    .where('slug', '==', post.slug)
                    .where('type', '==', 'BLOG')
                    .limit(1)
                    .get()

                if (!existing.empty) {
                    results.push({ slug: post.slug, id: existing.docs[0].id, status: 'already_exists' })
                    continue
                }

                const docRef = await db.collection('content').add({
                    ...post,
                    createdAt: admin.firestore.FieldValue.serverTimestamp(),
                    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                    publishedAt: admin.firestore.FieldValue.serverTimestamp(),
                })

                results.push({ slug: post.slug, id: docRef.id, status: 'created' })
            } catch (error: any) {
                results.push({ slug: post.slug, id: '', status: `error: ${error.message}` })
            }
        }

        return NextResponse.json({
            message: `Processed ${results.length} blog posts`,
            results,
        })
    } catch (error: any) {
        console.error('[SEED_BLOGS]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
