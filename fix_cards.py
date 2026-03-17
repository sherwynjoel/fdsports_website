import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_idx = html.find('    <style>\n        .process-container {')
end_idx = html.find('    <section id="testimonials">')

if start_idx == -1 or end_idx == -1:
    print('Failed to finding boundaries.')
    exit(1)

section_html = html[start_idx:end_idx]

cards = re.findall(r'<div class="process-step-card" data-img="([^"]+)">\s*<div class="step-number">(\d+)</div>\s*<div class="step-title">(.*?)</div>\s*<ul class="step-list">(.*?)</ul>\s*</div>', section_html, re.DOTALL)

css = """    <style>
        .process-container {
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            gap: 20px;
            padding-bottom: 20vh;
        }
        .process-step-card {
            border: 1px solid var(--glass-border);
            border-radius: 20px;
            padding: 40px 30px;
            position: sticky;
            overflow: hidden;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            color: var(--text-white);
            min-height: 250px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.6);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .process-step-card::before {
            content: '';
            position: absolute;
            top: 0; left: 0; right: 0; bottom: 0;
            background: linear-gradient(135deg, rgba(10, 15, 25, 0.95) 0%, rgba(10, 15, 25, 0.6) 100%);
            z-index: 0;
            transition: opacity 0.3s ease;
        }
        .process-step-card:hover::before {
            background: linear-gradient(135deg, rgba(10, 15, 25, 0.9) 0%, rgba(10, 15, 25, 0.4) 100%);
        }
        .step-number {
            font-size: 5rem;
            font-weight: 800;
            color: rgba(34, 197, 94, 0.1);
            position: absolute;
            top: -10px;
            right: 15px;
            z-index: 0;
            font-family: 'Outfit', sans-serif;
        }
        .step-title {
            font-size: 1.4rem;
            color: var(--text-white);
            margin-bottom: 15px;
            z-index: 1;
            position: relative;
            font-weight: 600;
        }
        .step-list {
            color: #d1d5db;
            margin-left: 20px;
            line-height: 1.8;
            z-index: 1;
            position: relative;
        }
        .step-list li {
            margin-bottom: 8px;
        }
    </style>

    <section id="construction-process" class="glass-dark" style="position: relative; padding-top: 80px;">
        <div class="section-header" style="text-align: center; margin-bottom: 40px;">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
            </style>
            <h2 style="font-size: 3rem; font-family: 'Bebas Neue', sans-serif; letter-spacing: 1.5px;">The Construction <span class="green-text">Process</span></h2>
            <p>11 structured steps to building a world-class sports venue.</p>
        </div>

        <div class="process-container">"""

new_cards = []
for i, (img, num, title, list_html) in enumerate(cards):
    top_offset = 120 + i * 20
    border_color = "var(--accent-green)" if i == 0 else "var(--glass-border)"
    new_card = f"""
            <div class="process-step-card" style="background-image: url('{img}'); top: {top_offset}px; border-color: {border_color};">
                <div class="step-number">{num}</div>
                <div class="step-title">{title}</div>
                <ul class="step-list">{list_html}</ul>
            </div>"""
    new_cards.append(new_card)

new_html = css + ''.join(new_cards) + """
        </div>
    </section>

"""

final_html = html[:start_idx] + new_html + '    <section id="testimonials">' + html[end_idx+len('    <section id="testimonials">'):]

# Also remove the script related to stickyImg intersection observer from final_html
final_html = re.sub(r'<script>\s*document\.addEventListener\(\'DOMContentLoaded\', \(\) => {\s*const stepCards = document\.querySelectorAll\(\'.process-step-card\'\);\s*const stickyImg.*?\}\);\s*</script>', '', final_html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(final_html)

print("Restored vertical stacking cards.")
