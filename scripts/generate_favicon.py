import subprocess
import os

os.makedirs('public', exist_ok=True)

# Generate high-precision favicon.svg exactly matching Image 2
# 512x512 viewbox
favicon_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Scissor Half defined vertically along Y axis (Pivot at 0,0) -->
    <!-- Blade points UP (y < 0), Handle points DOWN (y > 0) -->
    <g id="scissor-half">
      <!-- Blade: cutting edge on X=0, outer edge tapering, beveled tip -->
      <path d="
        M 0,-15
        L 0,-242
        C 0,-248 4,-251 10,-248
        L 52,-214
        C 58,-209 60,-200 56,-192
        L 36,-35
        C 38,-20 42,-8 48,0
        Z
      " />

      <!-- Pivot circular plate -->
      <circle cx="0" cy="0" r="42" />

      <!-- Neck to handle -->
      <path d="
        M -24,20
        C -30,42 -40,68 -48,90
        L 14,90
        C 18,70 26,45 30,20
        Z
      " />

      <!-- Handle loop with inner hole (evenodd fill-rule for automatic cutout) -->
      <path fill-rule="evenodd" d="
        M -17,72
        C 28,72 60,88 60,136
        L 60,188
        C 60,238 28,254 -17,254
        C -66,254 -98,238 -98,188
        L -98,136
        C -98,88 -66,72 -17,72
        Z
        M -17,106
        C 9,106 26,116 26,142
        L 26,182
        C 26,208 9,220 -17,220
        C -43,220 -60,208 -60,182
        L -60,142
        C -60,116 -43,106 -17,106
        Z
      " />
    </g>
  </defs>

  <!-- Scissors in deep black/slate #0B1120 -->
  <g transform="translate(256, 256)" fill="#0B1120">
    <!-- Right side piece: blade to top-right, handle to bottom-left -->
    <use href="#scissor-half" transform="rotate(45)" />

    <!-- Left side piece: mirrored across vertical axis (blade to top-left, handle to bottom-right) -->
    <use href="#scissor-half" transform="scale(-1, 1) rotate(45)" />

    <!-- Center pivot rivet / screw -->
    <circle cx="0" cy="0" r="22" fill="#FFFFFF" />
  </g>
</svg>
'''

with open('public/favicon.svg', 'w') as f:
    f.write(favicon_svg)

# Render PNGs using rsvg-convert (fastest, pristine antialiasing)
sizes = [
    (16, 'public/favicon-16x16.png'),
    (32, 'public/favicon-32x32.png'),
    (48, 'public/favicon-48x48.png'),
    (180, 'public/apple-touch-icon.png'),
    (192, 'public/android-chrome-192x192.png'),
    (512, 'public/favicon.png'),
]

for sz, path in sizes:
    subprocess.run(['rsvg-convert', '-w', str(sz), '-h', str(sz), 'public/favicon.svg', '-o', path], check=True)
    print(f"Generated {path} ({sz}x{sz})")

# Also create multi-resolution favicon.ico
subprocess.run(['convert', 'public/favicon-16x16.png', 'public/favicon-32x32.png', 'public/favicon-48x48.png', 'public/favicon.ico'], check=True)
print("Generated public/favicon.ico")
