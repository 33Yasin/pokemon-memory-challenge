# Pokémon Memory Challenge

Bu proje, React ile geliştirilmiş bir Pokémon hafıza oyunudur. Amaç, her turda daha önce seçmediğiniz bir Pokémon kartını seçerek en yüksek skora ulaşmaktır. Oyun, kartların yerini ve içeriğini sürekli değiştirerek hafızanızı test eder.

## Oyun Kuralları
- Oyun başladığında 2 satır x 6 sütun olmak üzere toplam 12 Pokémon kartı ekranda görünür.
- Bir karta tıkladığınızda:
  - Seçtiğiniz kart dahil 5 kartın içeriği tamamen değişir.
  - Tüm kartların yeri rastgele karışır (shuffle).
- Aynı kartı tekrar seçerseniz oyun biter.
- Her doğru seçimde skorunuz 1 artar.
- En yüksek skorunuz (Highest Score) localStorage ile kalıcı olarak tutulur.
- Doğru seçimde sesli bildirim (correct-sound), oyun bittiğinde ise farklı bir ses (fail-sound) çalar.

## Kurulum ve Çalıştırma

1. **Projeyi klonlayın:**
   ```bash
   git clone <repo-url>
   cd pokemon-memory-challenge
   ```
2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```
3. **Projeyi başlatın:**
   ```bash
   npm run dev
   ```
4. Tarayıcınızda `http://localhost:5173` adresini açarak oyunu oynayabilirsiniz.

## Kullanılan Teknolojiler
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Axios](https://axios-http.com/) (Pokémon API'den veri çekmek için)
- [PokéAPI](https://pokeapi.co/) (Veri kaynağı)

## Oyun Ekranı
- Skor ve en yüksek skor üstte gösterilir.
- Kartlar modern ve responsive bir gridde yer alır.
- Oyun bittiğinde ekranın ortasında büyük bir mesaj ve yeniden başlat butonu çıkar.

## Katkı
Katkıda bulunmak isterseniz lütfen bir fork oluşturun ve pull request gönderin.

---

Her türlü öneri ve geri bildiriminiz için teşekkürler!
