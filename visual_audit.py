import os
import json
import time
from playwright.sync_api import sync_playwright

def run_audit():
    # Using the hosted URL as requested
    base_url = "https://seo-smartmotor.vercel.app"
    
    routes = [
        "/",
        "/about",
        "/contact",
        "/services",
        "/packages",
        "/leyla",
        "/precision-parts",
        "/faq",
        "/careers",
        "/hub",
        "/brand/bmw",
        "/brand/mercedes-benz",
        "/brand/porsche",
        "/brand/audi",
        "/brand/bmw/engine-oil-change",
        "/brand/mercedes-benz/brake-service",
        "/location/musaffah-m9"
    ]

    output_dir = "visual_audit_report/screenshots"
    os.makedirs(output_dir, exist_ok=True)

    placeholders_report = {}

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        
        viewports = {
            "desktop": {"viewport": {"width": 1920, "height": 1080}},
            "mobile": {"viewport": {"width": 390, "height": 844}, "is_mobile": True}
        }

        for route in routes:
            url = f"{base_url}{route}"
            safe_name = route.replace("/", "_").strip("_") or "home"
            print(f"Auditing Live Page: {route}")
            
            placeholders_report[route] = []

            for vp_name, vp_config in viewports.items():
                context = browser.new_context(**vp_config)
                page = context.new_page()
                
                try:
                    response = page.goto(url, wait_until="networkidle", timeout=60000)
                    # Scroll to bottom to trigger lazy loading
                    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
                    time.sleep(2)
                    page.evaluate("window.scrollTo(0, 0)")
                    time.sleep(1)
                    
                    screenshot_path = f"{output_dir}/{safe_name}_{vp_name}.png"
                    page.screenshot(path=screenshot_path, full_page=True)
                    
                    if vp_name == "desktop":
                        # Enhanced placeholder detection
                        data = page.evaluate("""() => {
                            const images = [];
                            document.querySelectorAll('img').forEach(img => {
                                const src = img.getAttribute('src') || '';
                                const alt = img.getAttribute('alt') || '';
                                const rect = img.getBoundingClientRect();
                                
                                // Mark as placeholder if it uses the generic placeholder or has 'placeholder' in text
                                const isPlaceholder = src.includes('placeholder') || 
                                                     src.includes('pravatar') || 
                                                     alt.toLowerCase().includes('placeholder') ||
                                                     src === '';
                                                     
                                images.push({
                                    src,
                                    alt,
                                    isPlaceholder,
                                    visible: rect.width > 0 && rect.height > 0
                                });
                            });
                            return images;
                        }""")
                        placeholders_report[route] = data
                        
                except Exception as e:
                    print(f"Error auditing {route} ({vp_name}): {e}")
                
                context.close()
        
        browser.close()

    with open("visual_audit_report/placeholders.json", "w") as f:
        json.dump(placeholders_report, f, indent=2)

if __name__ == "__main__":
    run_audit()
