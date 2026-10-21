import numpy as np, wave
sr = 44100; B = 60/128; T = 15.0; N = int(sr*T)
L = np.zeros(N); R = np.zeros(N)
rng = np.random.default_rng(7)
def at(sec): return int(round(sec*sr))
def add(sig, t0, gain=1.0, pan=0.0):
    i = at(t0); j = min(N, i+len(sig))
    if i >= N: return
    s = sig[:j-i]*gain
    L[i:j] += s*(1-pan)*(1 if pan<=0 else 1-pan); R[i:j] += s*(1+pan)*(1 if pan>=0 else 1+pan)
def env(n, a=0.002, d=0.2):
    t = np.arange(n)/sr; e = np.minimum(1, t/a) * np.exp(-t/d); return e
def kick(d=0.32, f0=150, f1=45):
    n = at(d); t = np.arange(n)/sr; f = f1 + (f0-f1)*np.exp(-t*28)
    ph = 2*np.pi*np.cumsum(f)/sr; return np.sin(ph)*env(n, .001, .16) + 0.15*np.tanh(8*np.sin(ph))*env(n,.001,.05)
def noise(d): return rng.uniform(-1,1,at(d))
def hp(x, k=0.95):  # crude high-pass
    y = np.zeros_like(x); prev = 0; px = 0
    for i in range(len(x)): y[i] = k*(prev + x[i] - px); prev = y[i]; px = x[i]
    return y
def hat(d=0.06): x = hp(noise(d), .9); return x*env(len(x), .0005, .018)
def clap(d=0.25):
    x = hp(noise(d), .8); e = np.zeros(len(x))
    for o in [0, .01, .02]: k = at(o); e[k:] += env(len(x)-k, .0005, .06)
    return x*e*0.6
def crash(d=1.6): x = hp(noise(d), .75); return x*env(len(x), .001, .55)
def saw(f, d):
    n = at(d); t = np.arange(n)/sr; s = np.zeros(n)
    for det in (-0.12, 0, 0.12):
        ff = f*2**(det/12); s += 2*((t*ff) % 1) - 1
    return s/3
def lp(x, a=0.1):
    y = np.zeros_like(x); v = 0
    for i in range(len(x)): v += a*(x[i]-v); y[i] = v
    return y
def note(m): return 440*2**((m-69)/12)
def pluck(m, d=0.35): s = saw(note(m), d); return lp(s, .25)*env(len(s), .002, .12)
def sub(m, d): n = at(d); t = np.arange(n)/sr; return np.sin(2*np.pi*note(m)*t)*np.minimum(1, t/.005)*np.exp(-t/0.9)
def blip(m, d=0.12): n=at(d); t=np.arange(n)/sr; return np.sin(2*np.pi*note(m)*t)*env(n,.001,.04)

b = lambda k: k*B
# --- HOOK (b0–b8): boom on b0, plucks on each word, sparse hats from b4
add(kick(.6, 90, 35), 0, .9)
add(crash(2.0), 0, .12)
for k, m in zip(range(1, 5), [69, 72, 76, 74]): add(pluck(m), b(k), .45, (-.3, .3)[k % 2])
for k in (5, 6, 7): add(kick(.25, 130, 50), b(k), .45)
for k in np.arange(4, 8, .5): add(hat(), b(k), .18, .4)
# riser b4 -> b8
n = at(b(4)); t = np.arange(n)/sr
rise = (np.sin(2*np.pi*np.cumsum(220 + 1400*(t/t[-1])**2)/sr)*0.25 + hp(noise(b(4)), .97)*0.6) * (t/t[-1])**2
add(rise, b(4), .55)
# snare roll b6 -> b8
for k in np.arange(6, 8, .125): add(clap(.1), b(k), .12 + .25*(k-6)/2)

# --- MAIN GROOVE (b8–b31): four-on-the-floor, claps on 2&4, hats, sub bass, chord stabs
prog = [57, 53, 48, 55]  # A F C G
chords = {57: [69, 72, 76], 53: [65, 69, 72], 48: [64, 67, 72], 55: [67, 71, 74]}
for k in range(8, 31):
    if 22 <= k < 24: continue                     # breath before the lift
    add(kick(), b(k), 1.0)
    if k % 2 == 1: add(clap(), b(k), .55)
    add(hat(), b(k+.5), .3, .3); add(hat(.03), b(k+.25), .12, -.3); add(hat(.03), b(k+.75), .12, -.3)
    root = prog[((k-8)//4) % 4]
    add(sub(root-12, B*.95), b(k), .55)
    if k % 2 == 0:
        for m in chords[root]: add(lp(saw(note(m), B*.45), .18)*env(at(B*.45), .003, .14), b(k+.5), .12)
# drop + lift + CTA crashes
add(crash(), b(8), .5); add(kick(.5, 180, 40), b(8), .6)
add(crash(), b(16), .25); add(crash(), b(24), .45); add(crash(), b(28), .25)
# count-up blips on impact tiles b16..b19
for i, k in enumerate(range(16, 20)):
    for j in range(5): add(blip(84 + i*2 + j, .06), b(k) + j*0.06, .12)
# keyword whooshes on b8..b11
for k in range(8, 12):
    w = hp(noise(.22), .9)*np.linspace(0, 1, at(.22))**2*np.linspace(1, 0, at(.22)); add(w, b(k) - .2, .25, (-.5, .5)[k % 2])
# breath b22-b24: riser + plucks for "AI & Robotics" / "Future Skills"
n = at(b(2)); t = np.arange(n)/sr
add(hp(noise(b(2)), .97)*(t/t[-1])**2*.5, b(22), .5)
add(pluck(76, .4), b(23), .5); add(pluck(79, .4), b(24), .5)
for k in range(25, 28): add(blip(88 + (k-25)*3, .1), b(k), .25)
# FINAL HIT b31, then decay to silence
add(kick(.8, 160, 32), b(31), 1.1); add(crash(1.2), b(31), .6)
for m in [57, 64, 69, 72, 76]: add(lp(saw(note(m), .9), .2)*env(at(.9), .003, .35), b(31), .14)

mix = np.stack([L, R], 1)
fade = np.ones(N); fs = at(b(31)+0.30); fade[fs:] = np.linspace(1, 0, N-fs)**2; mix *= fade[:, None]
mix = np.tanh(mix*1.2); mix /= np.max(np.abs(mix))*1.05
with wave.open('music.wav', 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((mix*32767).astype('<i2').tobytes())
print('ok', N/sr)
