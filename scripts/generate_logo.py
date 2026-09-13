import subprocess
import os

os.makedirs('public', exist_ok=True)

# Generate logo.svg with exact geometry:
# 1. Scissor assembly:
#    - Top blade (pointing up-right ~82 deg)
#    - Lower blade (pointing right ~28 deg)
#    - Central circular pivot with white rivet screw
#    - Lower-left angled finger loop handle
#    - Lower-right finger loop forming the letter 'O'
# 2. Logotype text: 'LINETRIMMER' in bold geometric sans-serif
#
# Total viewbox: 960 x 300
# Baseline at Y = 280, letter cap-height = 110 (top at Y = 170)
# Scissors top blade reaches Y = 12

logo_svg = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 960 300" width="960" height="300">
  <defs>
    <!-- Scissor Left Handle Loop angled at ~-35 deg -->
    <g id="left-scissor-loop">
      <path fill-rule="evenodd" d="
        M -28,-18
        C -28,-28 -20,-36 -8,-36
        L 32,-36
        C 44,-36 52,-28 52,-18
        L 52,18
        C 52,28 44,36 32,36
        L -8,36
        C -20,36 -28,28 -28,18
        Z
        M -6,-12
        C -6,-16 -2,-20 6,-20
        L 18,-20
        C 26,-20 30,-16 30,-12
        L 30,12
        C 30,16 26,20 18,20
        L 6,20
        C -2,20 -6,16 -6,12
        Z
      " />
    </g>
  </defs>

  <g fill="#0B1120">
    <!-- 1. TOP BLADE -->
    <!-- Extends almost vertically upwards, curving slightly at the tip -->
    <path d="
      M 112,176
      L 98,28
      C 97,16 104,8 116,6
      L 126,6
      C 138,8 144,18 143,30
      L 134,176
      Z
    " />

    <!-- 2. LOWER BLADE -->
    <!-- Extends diagonally to the right over the 'O' -->
    <path d="
      M 124,166
      L 226,114
      C 234,110 242,114 243,122
      L 243,126
      C 243,132 238,138 230,143
      L 134,192
      Z
    " />

    <!-- 3. PIVOT HUB -->
    <circle cx="124" cy="180" r="26" />

    <!-- 4. LOWER-LEFT HANDLE ARM & LOOP -->
    <path d="
      M 112,188
      L 78,222
      C 74,226 68,226 64,222
      L 54,210
      C 50,206 50,200 54,196
      L 98,164
      Z
    " />
    <g transform="translate(64, 218) rotate(-36)">
      <use href="#left-scissor-loop" />
    </g>

    <!-- 5. PIVOT PIN SCREW (crisp white dot) -->
    <circle cx="124" cy="180" r="10" fill="#FFFFFF" />

    <!-- 6. NECK CONNECTING PIVOT TO 'O' -->
    <path d="
      M 132,182
      C 138,188 142,196 145,206
      L 124,212
      C 120,202 115,194 110,188
      Z
    " />

    <!-- 7. LETTER 'O' (Scissor Loop at baseline) -->
    <!-- Baseline Y=280, Top Y=170, Height=110, Width=94 -->
    <path fill-rule="evenodd" d="
      M 104,192
      C 104,178 116,170 132,170
      L 164,170
      C 180,170 192,178 192,192
      L 192,258
      C 192,272 180,280 164,280
      L 132,280
      C 116,280 104,272 104,258
      Z
      M 130,198
      C 130,192 136,188 144,188
      L 152,188
      C 160,188 166,192 166,198
      L 166,252
      C 166,258 160,262 152,262
      L 144,262
      C 136,262 130,258 130,252
      Z
    " />

    <!-- 8. LOGOTYPE: "LINETRIMMER" -->
    <!-- Extra-bold sans typography, baseline Y=280, cap-height=110 -->
    
    <!-- L (x: 206 to 258) -->
    <path d="
      M 206,170
      L 233,170
      L 233,256
      L 262,256
      L 262,280
      L 206,280
      Z
    " />

    <!-- I (x: 272 to 298) -->
    <path d="
      M 272,170
      L 298,170
      L 298,280
      L 272,280
      Z
    " />

    <!-- N (x: 310 to 372) -->
    <path d="
      M 310,170
      L 334,170
      L 355,230
      L 355,170
      L 378,170
      L 378,280
      L 354,280
      L 333,220
      L 333,280
      L 310,280
      Z
    " />

    <!-- E (x: 390 to 444) -->
    <path d="
      M 390,170
      L 444,170
      L 444,194
      L 416,194
      L 416,212
      L 440,212
      L 440,236
      L 416,236
      L 416,256
      L 446,256
      L 446,280
      L 390,280
      Z
    " />

    <!-- T (x: 454 to 516) -->
    <path d="
      M 454,170
      L 516,170
      L 516,194
      L 498,194
      L 498,280
      L 472,280
      L 472,194
      L 454,194
      Z
    " />

    <!-- R (x: 526 to 584) -->
    <path fill-rule="evenodd" d="
      M 526,170
      L 564,170
      C 578,170 588,178 588,192
      C 588,202 581,210 570,214
      L 590,280
      L 562,280
      L 546,222
      L 552,222
      L 552,280
      L 526,280
      Z
      M 552,192
      L 562,192
      C 566,192 569,195 569,199
      C 569,203 566,206 562,206
      L 552,206
      Z
    " />

    <!-- I (x: 598 to 624) -->
    <path d="
      M 598,170
      L 624,170
      L 624,280
      L 598,280
      Z
    " />

    <!-- M 1 (x: 634 to 706) -->
    <path d="
      M 634,170
      L 658,170
      L 670,230
      L 682,170
      L 706,170
      L 706,280
      L 684,280
      L 684,212
      L 675,254
      L 665,254
      L 656,212
      L 656,280
      L 634,280
      Z
    " />

    <!-- M 2 (x: 716 to 788) -->
    <path d="
      M 716,170
      L 740,170
      L 752,230
      L 764,170
      L 788,170
      L 788,280
      L 766,280
      L 766,212
      L 757,254
      L 747,254
      L 738,212
      L 738,280
      L 716,280
      Z
    " />

    <!-- E (x: 798 to 852) -->
    <path d="
      M 798,170
      L 852,170
      L 852,194
      L 824,194
      L 824,212
      L 848,212
      L 848,236
      L 824,236
      L 824,256
      L 854,256
      L 854,280
      L 798,280
      Z
    " />

    <!-- R (x: 862 to 920) -->
    <path fill-rule="evenodd" d="
      M 862,170
      L 900,170
      C 914,170 924,178 924,192
      C 924,202 917,210 906,214
      L 926,280
      L 898,280
      L 882,222
      L 888,222
      L 888,280
      L 862,280
      Z
      M 888,192
      L 898,192
      C 902,192 905,195 905,199
      C 905,203 902,206 898,206
      L 888,206
      Z
    " />
  </g>
</svg>
'''

with open('public/logo.svg', 'w') as f:
    f.write(logo_svg)

# Also generate white version for dark footer
logo_white_svg = logo_svg.replace('fill="#0B1120"', 'fill="#FFFFFF"').replace('fill="#FFFFFF"', 'fill="#0B1120"')
with open('public/logo-white.svg', 'w') as f:
    f.write(logo_white_svg)

# Render PNGs
subprocess.run(['rsvg-convert', '-w', '960', 'public/logo.svg', '-o', 'public/logo.png'], check=True)
subprocess.run(['rsvg-convert', '-w', '960', 'public/logo-white.svg', '-o', 'public/logo-white.png'], check=True)

print("Generated public/logo.svg, public/logo.png, public/logo-white.svg, public/logo-white.png")
