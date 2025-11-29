# 📧 KOMERCIA Email Templates - Guide d'utilisation

## 📋 Template Principal
Le fichier `email-template.html` contient un design complet et professionnel que vous pouvez utiliser pour tous vos emails.

---

## 🎨 Composants Disponibles

### 1. **En-tête (Header)**
- Logo KOMERCIA avec dégradé teal
- Sous-titre personnalisable
- Design moderne et professionnel

### 2. **Corps du Message (Body)**
Plusieurs éléments réutilisables :

#### **Salutation**
```html
<div class="greeting">Bonjour [Nom],</div>
```

#### **Contenu Principal**
```html
<div class="content">
    Votre texte ici...
</div>
```

#### **Code OTP**
```html
<div class="otp-code">
    <div class="otp-label">Code de vérification</div>
    <div class="otp-digits">123456</div>
    <div class="otp-expiry">⏱️ Ce code expire dans 1 minute 30 secondes</div>
</div>
```

#### **Boîte de Mise en Évidence**
```html
<div class="highlight-box">
    <div class="highlight-title">📌 Titre</div>
    <div class="highlight-content">Contenu important...</div>
</div>
```

#### **Liste d'Informations**
```html
<div class="info-list">
    <div class="info-item">
        <div class="info-label">Label :</div>
        <div class="info-value">Valeur</div>
    </div>
</div>
```

#### **Bouton d'Action (CTA)**
```html
<a href="#" class="cta-button">Texte du bouton</a>
```

#### **Note de Bas de Page**
```html
<div class="footer-note">
    <div class="footer-note-text">
        <strong>💡 Astuce :</strong> Votre message...
    </div>
</div>
```

### 3. **Pied de Page (Footer)**
- Liens utiles (Centre d'aide, CGU, etc.)
- Réseaux sociaux
- Coordonnées de l'entreprise
- Copyright

---

## 📝 Exemples d'Utilisation

### **Email de Vérification OTP**
Utilisez :
- Salutation
- Contenu principal
- Boîte OTP
- Boîte de mise en évidence (sécurité)
- Note de bas de page

### **Email de Bienvenue**
Utilisez :
- Salutation
- Contenu principal
- Liste d'informations (détails du compte)
- Bouton CTA (Commencer)
- Note de bas de page (astuces)

### **Email de Notification**
Utilisez :
- Salutation
- Contenu principal
- Boîte de mise en évidence (info importante)
- Bouton CTA (Voir les détails)

### **Email de Confirmation**
Utilisez :
- Salutation
- Contenu principal
- Liste d'informations (récapitulatif)
- Bouton CTA (Accéder au tableau de bord)

---

## 🎨 Personnalisation

### **Couleurs Principales**
- **Teal Principal** : `#14b8a6`
- **Teal Foncé** : `#0d9488`
- **Texte Principal** : `#1f2937`
- **Texte Secondaire** : `#6b7280`

### **Modifier les Couleurs**
Recherchez et remplacez dans le CSS :
- `#14b8a6` → Votre couleur principale
- `#0d9488` → Votre couleur secondaire

### **Modifier le Logo**
Remplacez le texte "KOMERCIA" dans :
```html
<div class="logo">VOTRE LOGO</div>
```

### **Modifier les Coordonnées**
Mettez à jour la section footer avec vos informations :
```html
<div class="footer-text">
    Votre Entreprise<br>
    Votre Adresse<br>
    Vos Coordonnées
</div>
```

---

## 📱 Responsive Design
Le template est entièrement responsive et s'adapte automatiquement aux mobiles :
- Padding réduit sur mobile
- Taille de police ajustée
- Layout adaptatif pour les listes d'informations

---

## ✅ Bonnes Pratiques

1. **Personnalisation** : Remplacez toujours `[Nom du destinataire]` par le vrai nom
2. **Liens** : Remplacez tous les `#` par de vrais liens
3. **Images** : Si vous ajoutez des images, utilisez des URLs absolues
4. **Test** : Testez toujours sur différents clients email (Gmail, Outlook, etc.)
5. **Texte Alt** : Ajoutez du texte alternatif pour les images
6. **Taille** : Gardez le HTML sous 102KB pour éviter les problèmes Gmail

---

## 🔧 Intégration

### **Avec un Service Email**
```javascript
// Exemple avec Nodemailer
const emailHTML = fs.readFileSync('email-template.html', 'utf8');
const personalizedEmail = emailHTML
    .replace('[Nom du destinataire]', userName)
    .replace('123456', otpCode);

await transporter.sendMail({
    to: userEmail,
    subject: 'Vérification de votre compte KOMERCIA',
    html: personalizedEmail
});
```

### **Avec Supabase Edge Functions**
```typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
    const emailTemplate = await Deno.readTextFile('./email-template.html');
    // Personnaliser et envoyer...
});
```

---

## 📦 Fichiers Inclus

1. **email-template.html** - Template principal complet
2. **email-examples.md** - Ce guide d'utilisation

---

## 🎯 Types d'Emails Supportés

✅ Vérification OTP
✅ Bienvenue
✅ Confirmation d'inscription
✅ Réinitialisation de mot de passe
✅ Notifications
✅ Rappels
✅ Confirmations de commande
✅ Newsletters
✅ Invitations
✅ Alertes

---

## 💡 Conseils

- **Objet de l'email** : Gardez-le court et descriptif (max 50 caractères)
- **Prévisualisation** : Les 100 premiers caractères sont visibles dans la prévisualisation
- **Call-to-Action** : Un seul CTA principal par email
- **Longueur** : Restez concis, les emails courts sont plus efficaces
- **Test A/B** : Testez différentes versions pour optimiser les taux d'ouverture

---

**Besoin d'aide ?** Contactez l'équipe technique KOMERCIA
