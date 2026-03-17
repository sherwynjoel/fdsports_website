import glob

print("Optimizing Title Tags...")

replacements = {
    'contact.html': ('<title>Contact Us | FD Sports Infrastructure</title>', '<title>Contact Us for Sports Turf Construction Quotes | FD Sports</title>'),
    'projects.html': ('<title>Our Projects | FD Sports Infrastructure</title>', '<title>Our Football Turf & Pickleball Projects Portfolio | FD Sports</title>'),
    'services.html': ('<title>Our Services | FD Sports Infrastructure</title>', '<title>Premium Sports Infrastructure & Turf Construction Services | FD Sports</title>'),
    'testimonials.html': ('<title>Client Testimonials | FD Sports Infrastructure</title>', '<title>Client Reviews & Testimonials - Best Turf Builders | FD Sports</title>')
}

for file, (old, new) in replacements.items():
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        content = content.replace(old, new)
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated title for {file}")
    except Exception as e:
        print(f"Failed to update {file}: {e}")

print("Title Tag Optimization Complete!")
