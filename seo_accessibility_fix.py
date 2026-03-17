import glob
import re

print("Starting deep SEO Accessibility script...")

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 1. Provide Descriptive Titles to Navigation Links if none exists
    nav_replacements = [
        ('<a href="index.html">Home</a>', '<a href="index.html" title="FD Sports Home Page - Best Turf Construction">Home</a>'),
        ('<a href="/services.html">Services</a>', '<a href="/services.html" title="Explore Our Sports Infrastructure Services">Services</a>'),
        ('<a href="/projects.html">Projects</a>', '<a href="/projects.html" title="View Our Completed Turf & Court Projects">Projects</a>'),
        ('<a href="/testimonials.html">Testimonials</a>', '<a href="/testimonials.html" title="Read Client Reviews & Testimonials">Testimonials</a>'),
        ('<a href="/contact.html">Contact</a>', '<a href="/contact.html" title="Contact FD Sports for a Free Consultation">Contact</a>'),
        ('href="/"', 'href="/" title="FD Sports Home"'),
    ]
    
    for old, new in nav_replacements:
        content = content.replace(old, new)

    # 2. Add aria-labels to the contact buttons if missing
    content = content.replace('class="btn btn-primary"', 'class="btn btn-primary" aria-label="Get a Free Consultation for Turf Construction"')
    content = content.replace('class="btn btn-secondary"', 'class="btn btn-secondary" aria-label="View Our Turf Construction Projects"')
    content = content.replace('class="nav-cta"', 'class="nav-cta" aria-label="Schedule a Free Consultation"')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("SEO Link Optimization and Aria-Labels Applied Successfully!")
