import glob
import re

print("Starting SEO optimization script...")

for file in glob.glob('*.html'):
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Add lazy loading to images that aren't the hero image or the main logo
    def add_lazy(match):
        img_tag = match.group(0)
        # Skip if it already has explicit loading
        if 'loading=' in img_tag or 'class="hero-video"' in img_tag or 'logo.png' in img_tag or 'hero_turf_construction' in img_tag:
            return img_tag
        return img_tag.replace('<img ', '<img loading="lazy" ')
    
    content = re.sub(r'<img [^>]*>', add_lazy, content)
    
    # Fix generic or missing alt attributes in projects page specifically
    if file == 'projects.html':
        content = content.replace('alt="Project"', 'alt="Sports Turf and Court Construction Project - South India"')
        content = content.replace('alt="Project"', 'alt="Expert Sports Infrastructure Project"')

    # Fix testimonials empty alts if any
    if file == 'testimonials.html':
         content = content.replace('alt=""', 'alt="Client Testimonial"')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("SEO Image Lazy-Loading & Alt Tag Optimization Complete!")
