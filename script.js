// تهيئة Smooth Scroll (Lenis) و GSAP
gsap.registerPlugin(ScrollTrigger);
const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
// إخفاء شاشة التحميل بعد انتهاء التحميل
window.addEventListener('load', () => {
setTimeout(() => {
gsap.to('#preloader', { opacity: 0, duration: 1, onComplete: () => document.getElementById('preloader').remove() });
}, 1500);
});
// بناء مشهد Three.js المطور (محرك اللابتوب الهندسي المدمج)
const canvas = document.getElementById('webgl-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x0A0A0A, 0.04);
const sizes = { width: window.innerWidth, height: window.innerHeight };
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.set(0, 2, 10);
scene.add(camera);
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// إضاءة الاستوديو
scene.add(new THREE.AmbientLight(0xffffff, 0.7));
const dirLight = new THREE.DirectionalLight(0xffffff, 2);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);
const goldLight = new THREE.PointLight(0xC9A84C, 4, 15);
goldLight.position.set(0, 1, 2);
scene.add(goldLight);
// بناء اللابتوب بالكود (يعمل فوراً بدون أخطاء روابط ملفات خارجية)
const laptopGroup = new THREE.Group();
scene.add(laptopGroup);
const matDark = new THREE.MeshStandardMaterial({ color: 0x141414, roughness: 0.6, metalness: 0.8 });
const matBlack = new THREE.MeshStandardMaterial({ color: 0x080808 });
// قاعدة اللابتوب
const baseMesh = new THREE.Mesh(new THREE.BoxGeometry(4, 0.15, 2.8), matDark);
laptopGroup.add(baseMesh);
// لوحة المفاتيح واللوحة اللمسية
const trackpad = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.16, 0.8), matBlack);
trackpad.position.set(0, 0, 0.8);
laptopGroup.add(trackpad);
const keyboard = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.16, 1.4), matBlack);
keyboard.position.set(0, 0, -0.4);
laptopGroup.add(keyboard);
// شاشة اللابتوب والمفصلة
const lidGroup = new THREE.Group();
lidGroup.position.set(0, 0.075, -1.4);
laptopGroup.add(lidGroup);
const lidMesh = new THREE.Mesh(new THREE.BoxGeometry(4, 0.1, 2.8), matDark);
lidMesh.position.set(0, 0, 1.4);
lidGroup.add(lidMesh);
// شاشة العرض المضيئة (Canvas Texture)
const screenCanvas = document.createElement('canvas');
screenCanvas.width = 1024; screenCanvas.height = 512;
const ctx = screenCanvas.getContext('2d');
ctx.fillStyle = '#050505'; ctx.fillRect(0, 0, 1024, 512);
ctx.fillStyle = '#C9A84C'; ctx.font = 'bold 75px "Amiri", serif'; ctx.textAlign = 'center';
ctx.fillText('MOHY STUDIO', 512, 230);
ctx.fillStyle = '#888'; ctx.font = '35px "Tajawal", sans-serif';
ctx.fillText('تجربة رقمية سينمائية', 512, 310);
const screenMesh = new THREE.Mesh(
new THREE.PlaneGeometry(3.8, 2.5),
new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(screenCanvas) })
);
screenMesh.rotation.x = -Math.PI / 2;
screenMesh.position.set(0, -0.06, 1.4);
lidGroup.add(screenMesh);
// الوضع الابتدائي (مغلق وأسفل الشاشة)
lidGroup.rotation.x = Math.PI;
laptopGroup.position.set(0, -4, 0);
laptopGroup.rotation.set(0.4, 0, 0);
// صعود اللابتوب بسلاسة
gsap.to(laptopGroup.position, { y: -0.5, duration: 2, ease: 'power3.out', delay: 1.5 });
// ربط حركة الـ 3D بالتمرير (ScrollTrigger)
const isMobile = window.innerWidth < 768;
const tlScroll = gsap.timeline({
scrollTrigger: {
trigger: '#hero-sequence',
start: 'top top',
end: 'bottom bottom',
scrub: 1.5
}
});
tlScroll.to(lidGroup.rotation, { x: Math.PI * 0.38, ease: 'power1.inOut' }, 0)
.to(laptopGroup.rotation, { x: 0.1, y: Math.PI * 2, ease: 'power1.inOut' }, 0)
.to(laptopGroup.position, {
x: isMobile ? 0 : -2.8,
y: isMobile ? 1.8 : 0,
z: isMobile ? -2 : 0,
ease: 'power1.inOut'
}, 0);
// حلقة الرندر المستمرة مع طفو خفيف
const clock = new THREE.Clock();
function animate() {
const time = clock.getElapsedTime();
laptopGroup.position.y += Math.sin(time * 2.5) * 0.0015;
renderer.render(scene, camera);
requestAnimationFrame(animate);
}
animate();
// التجاوب مع تغيير حجم الشاشة
window.addEventListener('resize', () => {
sizes.width = window.innerWidth; sizes.height = window.innerHeight;
camera.aspect = sizes.width / sizes.height; camera.updateProjectionMatrix();
renderer.setSize(sizes.width, sizes.height);
ScrollTrigger.refresh();
});