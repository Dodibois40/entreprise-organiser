const nodemailer = require('nodemailer');
const config = require('../config/config');

/**
 * Service pour l'envoi d'emails
 */
const emailService = {
  /**
   * Crée un transporteur pour l'envoi d'emails
   * @returns {Object} - Transporteur Nodemailer
   */
  createTransporter: () => {
    // Pour le développement, utiliser Ethereal (faux service d'emails pour les tests)
    if (config.env === 'development') {
      return nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER || 'demo@ethereal.email',
          pass: process.env.EMAIL_PASS || 'password'
        }
      });
    }
    
    // Pour la production, utiliser un service SMTP réel
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  },

  /**
   * Envoie un email
   * @param {Object} options - Options d'email (destinataire, sujet, etc.)
   * @returns {Promise} - Promesse avec le résultat de l'envoi
   */
  sendEmail: async (options) => {
    try {
      // Créer le transporteur
      const transporter = emailService.createTransporter();
      
      // Configurer l'email
      const mailOptions = {
        from: process.env.EMAIL_FROM || '"Entreprise Organiser" <noreply@entreprise-organiser.com>',
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html
      };
      
      // Envoyer l'email
      const info = await transporter.sendMail(mailOptions);
      
      // En développement, afficher l'URL de prévisualisation
      if (config.env === 'development') {
        console.log('URL de prévisualisation:', nodemailer.getTestMessageUrl(info));
      }
      
      return info;
    } catch (error) {
      console.error('Erreur lors de l\'envoi de l\'email:', error);
      throw error;
    }
  },
  
  /**
   * Envoie un email de réinitialisation de mot de passe
   * @param {Object} user - Utilisateur
   * @param {String} resetToken - Token de réinitialisation
   * @param {String} resetUrl - URL pour réinitialiser le mot de passe
   * @returns {Promise} - Promesse avec le résultat de l'envoi
   */
  sendPasswordResetEmail: async (user, resetToken, resetUrl) => {
    const subject = 'Réinitialisation de votre mot de passe';
    const text = `
      Bonjour ${user.prenom} ${user.nom},
      
      Vous avez demandé la réinitialisation de votre mot de passe.
      
      Veuillez cliquer sur le lien suivant pour réinitialiser votre mot de passe:
      ${resetUrl}
      
      Ce lien expirera dans 1 heure.
      
      Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.
      
      Cordialement,
      L'équipe Entreprise Organiser
    `;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3a3a3a;">Réinitialisation de votre mot de passe</h2>
        <p>Bonjour ${user.prenom} ${user.nom},</p>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Veuillez cliquer sur le bouton ci-dessous pour réinitialiser votre mot de passe:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" style="background-color: #4285F4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Réinitialiser mon mot de passe
          </a>
        </p>
        <p>Ce lien expirera dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.</p>
        <p>Cordialement,<br>L'équipe Entreprise Organiser</p>
      </div>
    `;
    
    return await emailService.sendEmail({
      to: user.email,
      subject,
      text,
      html
    });
  },
  
  /**
   * Envoie un email de vérification d'email
   * @param {Object} user - Utilisateur
   * @param {String} verificationUrl - URL pour vérifier l'email
   * @returns {Promise} - Promesse avec le résultat de l'envoi
   */
  sendEmailVerification: async (user, verificationUrl) => {
    const subject = 'Vérification de votre adresse email';
    const text = `
      Bonjour ${user.prenom} ${user.nom},
      
      Merci de vous être inscrit sur Entreprise Organiser.
      
      Veuillez cliquer sur le lien suivant pour vérifier votre adresse email:
      ${verificationUrl}
      
      Ce lien expirera dans 24 heures.
      
      Cordialement,
      L'équipe Entreprise Organiser
    `;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #3a3a3a;">Vérification de votre adresse email</h2>
        <p>Bonjour ${user.prenom} ${user.nom},</p>
        <p>Merci de vous être inscrit sur Entreprise Organiser.</p>
        <p>Veuillez cliquer sur le bouton ci-dessous pour vérifier votre adresse email:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background-color: #4285F4; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
            Vérifier mon adresse email
          </a>
        </p>
        <p>Ce lien expirera dans 24 heures.</p>
        <p>Cordialement,<br>L'équipe Entreprise Organiser</p>
      </div>
    `;
    
    return await emailService.sendEmail({
      to: user.email,
      subject,
      text,
      html
    });
  }
};

module.exports = emailService; 