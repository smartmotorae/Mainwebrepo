import { NextResponse } from 'next/server'
import { getAdminDb } from '@/lib/firebase-admin'
import { verifyAdminSession } from '@/lib/auth-utils'
import admin from 'firebase-admin'

export const dynamic = 'force-dynamic'

const BLOG_POSTS = [
    {
        type: 'BLOG',
        slug: 'porsche-cayenne-brake-pad-disc-replacement-cost-abu-dhabi',
        title: 'Porsche Cayenne Brake Pad and Disc Replacement Cost Abu Dhabi',
        category: 'Porsche',
        image: '/brands/png/porsche.png',
        excerpt: 'Hearing a squeal from your Porsche Cayenne brakes? Learn when to replace pads vs. discs, why Abu Dhabi driving wears them faster, and the true cost of Porsche brake service.',
        content: `# Porsche Cayenne Brake Pad and Disc Replacement Cost Abu Dhabi

The Porsche Cayenne is an engineering marvel — a 2.2-ton SUV that accelerates and handles like a sports car. But bringing that much mass to a stop from highway speeds requires massive braking power. If your Cayenne's brake warning light has illuminated, or you're hearing the dreaded high-pitched squeal at traffic lights in Abu Dhabi, it's time for a brake service.

## Why Cayenne Brakes Wear Differently in the UAE

Porsche engineers design their brake systems for the Autobahn. The brake pads use a specialized high-friction compound that provides incredible stopping power and resists fade at high speeds. 

However, in Abu Dhabi, the driving profile is entirely different:
1. **Stop-and-Go Traffic:** Constant braking in heavy city traffic generates immense heat without the high-speed airflow needed to cool the rotors.
2. **Dust and Sand:** Fine desert sand coats the brake rotors. When you apply the brakes, the sand acts as an abrasive paste between the pad and the disc, accelerating wear.
3. **High Ambient Heat:** With summer road temperatures exceeding 60°C, the brakes have less thermal headroom before reaching their maximum operating temperature.

As a result, while a Cayenne driven in Europe might get 50,000 km from a set of front brake pads, a Cayenne driven in Abu Dhabi city traffic typically needs new front pads every 25,000 - 35,000 km.

## Pads vs. Discs (Rotors) — Do You Need Both?

A common question we get at Smart Motor is: *"Do I have to replace the discs when I replace the pads?"*

**The short answer:** Not always, but more often than on a standard car.

**The technical reason:** Porsche uses relatively "soft" brake discs paired with aggressive brake pads to maximize stopping friction. This means the disc wears down almost as fast as the pad. Porsche has a strict minimum thickness specification for their brake discs (stamped directly on the rotor hub).

At Smart Motor, we never guess. We measure your brake discs with a digital micrometer.
- If the disc is above the minimum thickness and has no deep scoring or warping, we can install new pads only.
- If the disc is at or below the minimum thickness, or has developed a significant "lip" on the outer edge, replacing the discs is mandatory for safety. Putting new flat pads on worn, grooved discs will result in poor braking, severe squealing, and premature pad failure.

Usually, Cayenne front discs last for two sets of brake pads.

## The Smart Motor Brake Service Protocol

When you bring your Porsche to us, the brake service includes much more than simply swapping parts:

1. **OEM-Grade Parts Only:** We use genuine Porsche, Brembo, Textar, or Pagid components (the actual manufacturers who supply Porsche). We never use cheap aftermarket ceramic pads that compromise the Cayenne's braking feel.
2. **Hardware Replacement:** We replace the retaining pins, anti-rattle springs, and wear sensors. Reusing heat-cycled hardware is a common cause of brake noise.
3. **Caliper Servicing:** We clean the multi-piston Brembo calipers thoroughly, removing brake dust buildup, and apply high-temperature ceramic paste to the pad contact points to prevent squealing.
4. **Brake Fluid Check:** We test the moisture content of your brake fluid. DOT 4 fluid absorbs moisture from Abu Dhabi's humid coastal air, lowering its boiling point and creating a "spongy" pedal feel.

## Cost Guidance in Abu Dhabi

*Note: Prices vary depending on your specific Cayenne model (Base, S, GTS, Turbo, or E-Hybrid) as brake sizes differ significantly.*

| Service | Typical Range (AED) |
|---------|-------------------|
| Front Brake Pads & Sensors only | 1,200 - 1,800 |
| Rear Brake Pads & Sensors only | 1,000 - 1,500 |
| Front Brake Pads, Sensors & Discs | 3,500 - 5,500 |
| Rear Brake Pads, Sensors & Discs | 2,800 - 4,500 |
| Brake Fluid Flush | 300 - 450 |

*(These prices are significantly lower than main dealer rates while utilizing the exact same OEM component manufacturers).*

## A Note on Porsche Surface Coated Brakes (PSCB) and Ceramic (PCCB)

If your Cayenne is equipped with the white-caliper PSCB (tungsten-carbide coated) or yellow-caliper PCCB (carbon ceramic) brakes, the replacement costs and intervals are entirely different. These systems are designed to last significantly longer (often 100,000+ km for ceramics) but cost substantially more to replace. We have the specialized tools required to service these advanced systems without chipping the delicate rotors.

## Book Your Porsche Brake Inspection

Never ignore a brake warning light or grinding noise. At Smart Motor, we offer free visual brake inspections. We'll measure your pad and disc thickness, show you exactly how much life remains, and provide a transparent quote with no hidden surprises.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
    {
        type: 'BLOG',
        slug: 'audi-q7-quattro-system-service-guide-abu-dhabi',
        title: 'Audi Q7 Quattro System Service — Complete Guide Abu Dhabi',
        category: 'Audi',
        image: '/brands/png/audi.png',
        excerpt: 'The Audi Q7 Quattro AWD system is legendary, but it requires specific maintenance in the UAE. Learn when to service the Haldex/Torsen differentials, transfer case, and how to prevent costly drivetrain vibrations.',
        content: `# Audi Q7 Quattro System Service — Complete Guide Abu Dhabi

The Audi Q7's Quattro all-wheel-drive system is arguably the most sophisticated on the market. It provides unparalleled grip on wet roads, stability on the highway, and surprising capability on UAE desert sand. However, the Quattro system is complex, and neglecting its maintenance leads to drivetrain vibrations, binding on tight turns, and eventually, catastrophic mechanical failure.

## Understanding Your Q7's Quattro System

Depending on the year of your Q7, your Quattro system consists of several fluid-filled components:
1. **The Front Differential**
2. **The Center Differential / Transfer Case** (Torsen or self-locking center diff)
3. **The Rear Differential**
4. **The Automatic Transmission** (typically the ZF 8-speed)

Each of these components relies on specific gear oils and friction modifiers to transfer power smoothly. 

## The Abu Dhabi Heat Factor

Audi's official maintenance schedule often lists differential and transfer case fluids as "lifetime fill." As we constantly remind our customers at Smart Motor: **"Lifetime" means the lifetime of the component, which is severely shortened if the fluid isn't changed.**

In Abu Dhabi, road temperatures can hit 60°C in summer. When you drive your Q7 at 140 km/h on the highway, the friction inside the transfer case generates immense heat. Because the ambient air is already hot, the fluid cannot cool down effectively. 

Over time, this thermal stress causes the gear oil to break down, losing its viscosity and its ability to lubricate the intricate gears and clutch packs.

## Signs Your Quattro System Needs Servicing

If your Q7 is exhibiting any of these symptoms, the drivetrain fluids have likely degraded past their useful life:

- **The "Quattro Rumble":** A low-frequency vibration or shudder felt through the floorboards or steering wheel when making tight, slow-speed turns (like parking or U-turns). This happens when the center differential fluid has lost its friction modifiers, causing the internal clutches to bind rather than slip smoothly.
- **Whining noise from the floor:** A high-pitched gear whine at highway speeds usually indicates low or severely degraded differential fluid.
- **Clunking when shifting:** Hard engagement when shifting from Park to Drive, or when decelerating.

## Smart Motor's Quattro Service Protocol

We recommend servicing the Quattro drivetrain components every **60,000 to 80,000 km** in the UAE. 

Our complete Quattro service includes:

1. **Fluid Evacuation:** Draining the front differential, rear differential, and transfer case. We inspect the old fluid for metal shavings (a sign of severe mechanical wear) or milky discoloration (a sign of water ingress, often from driving through deep puddles during UAE rainstorms).
2. **Precise Refilling:** This is where general garages make mistakes. The Q7 requires highly specific fluids. The transfer case, for example, often requires Audi's specific fluid with the exact proportion of *Sturaco* friction modifier. Using standard 75W-90 gear oil will immediately cause the system to bind and shudder.
3. **Level Calibration:** Fluids must be filled to the exact millimeter relative to the fill plug, often while monitoring the fluid temperature via diagnostic software to account for thermal expansion.
4. **Adaptation Reset:** We use specialized diagnostic tools to reset the all-wheel-drive control module's learned adaptations, forcing it to relearn the friction characteristics of the new fluid.

## Cost vs. Benefit

A complete Quattro drivetrain fluid service (Front Diff, Rear Diff, and Transfer Case) at Smart Motor typically costs between **AED 1,500 and AED 2,200**, depending on the exact Q7 model year and the required OEM fluids.

Compare this to the cost of replacing a burned-out center transfer case, which can easily exceed **AED 15,000**. Preventive fluid maintenance is the cheapest insurance for your Audi.

## Book Your Audi Q7 Drivetrain Service

Don't wait for the "Quattro Rumble" to start. Keep your Audi Q7 driving as smoothly as the day it left Ingolstadt. Contact Smart Motor today to schedule your Quattro system health check and fluid service.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
    {
        type: 'BLOG',
        slug: 'lexus-lx570-engine-overheating-causes-fix-abu-dhabi',
        title: 'Lexus LX 570 Engine Overheating — Causes and Fix Abu Dhabi',
        category: 'Lexus',
        image: '/brands/png/lexus.png',
        excerpt: 'Is your Lexus LX 570 temperature gauge creeping up? Do not risk a blown 5.7L V8. Learn the top causes of Lexus overheating in Abu Dhabi and how Smart Motor permanently resolves them.',
        content: `# Lexus LX 570 Engine Overheating — Causes and Fix Abu Dhabi

The Lexus LX 570 is renowned as one of the most reliable and indestructible luxury SUVs on the planet. Its 5.7L V8 (3UR-FE) engine is legendary for crossing the 500,000 km mark with minimal fuss. However, there is one environmental factor that tests even Lexus engineering: the Abu Dhabi summer.

If the temperature gauge on your LX 570 is creeping above the halfway mark, or if your AC cuts out when idling in traffic, your cooling system is compromised. Continuing to drive an overheating 5.7L V8 can warp the aluminum cylinder heads, turning a simple repair into an AED 20,000+ engine rebuild.

## Top 4 Causes of LX 570 Overheating in the UAE

At Smart Motor, we service hundreds of LX 570s and Land Cruisers. When an LX 570 overheats, it is almost always due to one of these four failures:

### 1. Viscous Fan Clutch Failure (Most Common)
Unlike many modern SUVs that use entirely electric radiator fans, the LX 570 uses a heavy-duty mechanical fan driven by the engine belt, controlled by a viscous fluid clutch. 
- **The Problem:** Over years of intense UAE heat, the silicone fluid inside the clutch degrades or leaks. The fan stops spinning fast enough at idle to pull air through the radiator.
- **The Symptom:** The car overheats in stop-and-go Abu Dhabi traffic or at drive-thrus, but cools back down perfectly when driving at highway speeds (because ram air is cooling the radiator). AC performance also drops significantly at idle.

### 2. Blocked Radiator and Condenser Fins
- **The Problem:** Desert sand, dust, and debris get sucked into the front grille and pack tightly between the fins of the AC condenser and the engine radiator behind it.
- **The Symptom:** Poor cooling efficiency under heavy load. The system simply cannot exchange heat with the outside air because it's wearing a "blanket" of sand.

### 3. Coolant Valley Leak
- **The Problem:** The 5.7L V8 has a coolant crossover plate hidden deep in the "valley" beneath the intake manifold. The sealant holding this plate degrades over time, causing a slow, hidden coolant leak.
- **The Symptom:** You constantly need to top up the pink Lexus Super Long Life Coolant, but you never see a puddle under the car (the coolant pools in the engine valley and evaporates before hitting the ground). Eventually, the coolant level drops too low, causing overheating.

### 4. Water Pump Seepage
- **The Problem:** The mechanical water pump bearing or seal wears out.
- **The Symptom:** A squeaking noise from the front of the engine, or pink crusty residue (dried coolant) visible around the pulleys at the front of the V8.

## The Smart Motor Diagnosis and Repair Process

We don't guess with your Lexus. If you bring an overheating LX 570 to our Musaffah workshop, we follow a strict diagnostic protocol:

1. **Digital Temperature Sweep:** We use an infrared thermometer and OBD2 live data to map the temperature across the radiator to check for cold spots (internal blockages).
2. **Fan Clutch Test:** We test the engagement resistance of the viscous fan clutch at operating temperature.
3. **Pressure Test:** We pressurize the cooling system to 1.5 bar to expose any hidden leaks, specifically inspecting the water pump weep hole and the engine valley.
4. **Cap Test:** A failed radiator cap prevents the system from holding pressure, lowering the boiling point of the coolant. We test it.

**The Fix:**
Whether you need a new genuine Aisin water pump, a replacement viscous fan clutch, or a complete radiator flush and exterior fin deep-clean, we only use Genuine Toyota/Lexus parts for the cooling system. Aftermarket cooling parts simply do not survive the UAE summer. We refill the system using a vacuum tool to ensure zero air pockets, using only 50/50 premixed Genuine Toyota Super Long Life Coolant (Pink).

## Preventative Advice

To keep your LX 570 running cool:
- **Never use water** or cheap green coolant. It corrodes the aluminum block and destroys the water pump impeller.
- Have the radiator fins externally washed with low-pressure water and compressed air before every summer (May).

## Book Your LX 570 Cooling Inspection

Don't wait for the dashboard warning light. If your LX 570 is running hotter than normal, let the Lexus specialists at Smart Motor restore its cooling efficiency today.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
    {
        type: 'BLOG',
        slug: 'toyota-prado-suspension-noise-bushing-replacement-abu-dhabi',
        title: 'Toyota Prado Suspension Noise — Ball Joint and Bushing Replacement Abu Dhabi',
        category: 'Toyota',
        image: '/brands/png/toyota.png',
        excerpt: 'Hearing clunks, squeaks, or rattles over speed bumps in your Toyota Prado? Worn lower control arm bushings and ball joints are the likely culprits. Learn how Smart Motor restores your Prado ride quality.',
        content: `# Toyota Prado Suspension Noise — Ball Joint and Bushing Replacement Abu Dhabi

The Toyota Prado is built to conquer the harshest terrains in the world, making it a favorite for Abu Dhabi families and desert enthusiasts alike. Its double-wishbone front suspension is robust, but it relies on rubber bushings and steel ball joints to absorb impacts and allow movement. 

When you start hearing a clunk over speed bumps in Khalifa City, or a persistent squeaking when turning the steering wheel, it means these crucial suspension components have reached the end of their lifespan.

## Why Prado Bushings Fail in the UAE

The lifespan of rubber suspension components is dictated by two things: mechanical stress and environmental exposure.

1. **The Heat Factor:** The ambient heat of Abu Dhabi, combined with the radiant heat from the asphalt, bakes the rubber bushings in your Prado's lower control arms. Over 4 to 6 years, the rubber dries out, loses its elasticity, and begins to crack and tear.
2. **Speed Bumps and Potholes:** The constant vertical articulation over speed bumps puts immense torsional strain on the lower control arm (LCA) bushings.
3. **Desert Driving:** If you take your Prado off-road, fine sand works its way into the ball joint dust boots, acting as an abrasive paste that rapidly wears out the joint.

## Identifying the Noise

Different failures produce different sounds:
- **Heavy "Clunk" over bumps:** Usually indicates completely torn Lower Control Arm (LCA) bushings. The metal arm is shifting and hitting the subframe.
- **Squeaking or creaking when turning the wheel at low speeds:** The classic sign of a dry or failing lower ball joint. **Do not ignore this.** If a lower ball joint separates while driving, the front wheel collapses outward, resulting in a severe accident and massive damage to the fender, axle, and steering rack.
- **Rattling over washboard roads:** Often caused by worn sway bar links (stabilizer links) or sway bar "D" bushings. This is an annoying but relatively cheap and easy fix.

## The Smart Motor Repair Solution

Many general garages in Abu Dhabi will simply spray WD-40 on the squeaking joints (a temporary and dangerous cover-up) or tell you to replace the entire lower control arm assembly at a massive cost.

At Smart Motor, we offer specialized Prado suspension solutions:

### 1. Bushing Pressing (Cost-Effective Repair)
If your control arms are structurally sound but the rubber is torn, we don't force you to buy a whole new arm. We remove the arms, use a 20-ton hydraulic shop press to push out the old, torn bushings, and press in brand new, genuine Toyota bushings. This saves you thousands of dirhams compared to dealer replacement methods.

### 2. Ball Joint Replacement
The Prado 120 and 150 series utilize a bolt-on lower ball joint. We unbolt the worn, dangerous joint and install a Genuine Toyota or high-quality Japanese (555 Brand) replacement, ensuring your steering geometry is safe and secure.

### 3. KDSS System Calibration
If your Prado is equipped with the Kinetic Dynamic Suspension System (KDSS), the suspension components are under immense hydraulic pressure. Our technicians are trained to safely depressurize the KDSS system, replace the worn components, and recalibrate the system to ensure the vehicle sits level and handles correctly.

### 4. Mandatory Wheel Alignment
Any time lower control arms or ball joints are disturbed, the camber, caster, and toe angles are altered. Every Prado suspension job at Smart Motor finishes on our computerized 3D laser alignment rack to ensure your tires don't wear unevenly and the truck drives perfectly straight.

## Don't Compromise on Suspension Safety

Suspension noises in a heavy 4x4 like the Prado are warning signs. What starts as an annoying squeak can quickly become a catastrophic failure at highway speeds. 

Bring your Toyota Prado to Smart Motor in Musaffah for a comprehensive undercarriage inspection. We will identify exactly what is worn, what is safe, and provide a clear, prioritized repair plan.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443`,
        author: 'Smart Motor Technical Team',
        published: true,
    },
    {
        type: 'BLOG',
        slug: 'bmw-5-series-g30-oil-consumption-fix-abu-dhabi',
        title: 'BMW 5 Series (G30) Oil Consumption Fix Abu Dhabi',
        category: 'BMW',
        image: '/brands/png/bmw.png',
        excerpt: 'Is your BMW 5 Series asking for a liter of oil every 2,000 km? Discover why modern BMW engines burn oil, the difference between normal consumption and a mechanical fault, and how Smart Motor fixes it.',
        content: `# BMW 5 Series (G30) Oil Consumption Fix Abu Dhabi

"Add 1 Liter of Engine Oil" — it's the notification BMW 5 Series owners dread seeing on their iDrive screen, especially when the car was serviced just a few months ago. 

If you own a G30 generation BMW 5 Series (2017-present), particularly a 520i, 530i (B48 engine) or 540i (B58 engine) in Abu Dhabi, dealing with engine oil consumption is a common frustration. At Smart Motor, we specialize in diagnosing and resolving BMW oil loss issues.

## How Much Oil Consumption is "Normal"?

This is highly debated. BMW's official technical documentation states that consuming up to 1 liter of oil per 1,500 km can be considered "normal" under certain driving conditions. 

However, as automotive engineers, we consider that excessive. A healthy B48 or B58 engine driven in Abu Dhabi should not require top-ups between a standard 10,000 km service interval. If your 5 Series is burning a liter every 2,000 to 3,000 km, there is an underlying issue that needs addressing.

## Top Causes of BMW Oil Consumption

When a BMW 5 Series loses oil, it is either **leaking it** externally or **burning it** internally.

### 1. External Leaks (The Good News)
Due to the intense heat in Abu Dhabi, the rubber gaskets sealing the engine become hard and brittle much faster than in cooler climates. 
- **Valve Cover Gasket:** The most common culprit. Oil seeps out, drips onto the hot exhaust manifold, and burns off. You might notice a faint smell of burning plastic/oil through the AC vents, but no drips on the driveway.
- **Oil Filter Housing Gasket:** Oil leaks down the front of the engine block. Left unchecked, this oil can destroy the engine's main serpentine belt, leading to catastrophic engine failure.
- **Oil Pan Gasket:** A slower leak that usually results in an oily undertray beneath the car.

**The Fix:** We clean the engine with a degreaser, add a UV dye to the oil, run the car, and use a blacklight to pinpoint the exact leak. Gasket replacement is straightforward and permanently solves the issue.

### 2. PCV Valve Failure (The Sneaky Problem)
The Positive Crankcase Ventilation (PCV) valve is designed to relieve pressure inside the engine block by routing oil vapors back into the intake manifold to be burned. 
- **The Problem:** The internal rubber diaphragm tears. When this happens, the engine actively sucks liquid oil (not just vapor) straight out of the crankcase and burns it in the cylinders.
- **The Symptom:** Massive oil consumption, a rough idle, a whistling sound from the engine, and sometimes thick blue smoke from the exhaust on cold starts.
- **The Fix:** On many modern BMWs, the PCV valve is integrated into the plastic valve cover. We replace the entire valve cover assembly with a Genuine BMW part, instantly curing the oil burning.

### 3. Valve Stem Seals (The High-Mileage Issue)
More common on older V8 models (like the 550i's N63 engine), but occasionally seen on high-mileage 6-cylinders. The rubber seals around the engine's valves harden. When the car sits idling in Abu Dhabi traffic, oil seeps past the seals into the combustion chamber. When you accelerate away from the traffic light, a puff of blue smoke exits the exhaust.

### 4. Turbocharger Seals
Your 5 Series is turbocharged. The turbo spins at over 100,000 RPM and is lubricated by engine oil. If the internal turbo seals fail, oil leaks into the intake tract or the exhaust, burning off rapidly.

## Why Oil Weight Matters in the UAE

Many rapid-lube places in Abu Dhabi put generic 5W-30 oil in every car. BMW engines in the extreme heat of the UAE often benefit from a slightly thicker, high-quality fully synthetic oil, such as 5W-40, meeting the strict BMW LL-01 specification. 

Thicker oil is less prone to vaporizing past aging seals at extreme operating temperatures. Simply switching to the correct, high-quality oil grade often reduces consumption by 50%.

## The Smart Motor BMW Diagnosis

Don't keep buying expensive liters of oil to feed a leaking engine. Bring your BMW 5 Series to Smart Motor. We will:
1. Scan the DME for hidden misfire or mixture codes.
2. Perform a crankcase pressure test to verify PCV functionality.
3. Remove the underbody shields to inspect for hidden external leaks.
4. Inspect the spark plugs for heavy ash deposits (confirming internal burning).

Stop the top-ups. Get a permanent fix for your BMW's oil consumption at Smart Motor.

**Smart Motor Auto Repair** — M9, Musaffah Industrial Area, Abu Dhabi | +971 2 555 5443`,
        author: 'Smart Motor Technical Team',
        published: true,
    }
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
            message: `Processed ${results.length} blog posts in batch 2`,
            results,
        })
    } catch (error: any) {
        console.error('[SEED_BLOGS_BATCH2]', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
