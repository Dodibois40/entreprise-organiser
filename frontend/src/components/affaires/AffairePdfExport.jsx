import React, { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { IconDownload, IconPrinter } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import AffaireFinancialSummary from './AffaireFinancialSummary';
import AffaireDashboard from './AffaireDashboard';

const AffairePdfExport = ({ affaire, financialData, marginAlerts }) => {
  const printRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  const formatDate = (date) => {
    if (!date) return 'Non définie';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(amount || 0);
  };

  const generatePDF = async () => {
    if (!printRef.current || !affaire || !financialData) {
      toast.error('Données manquantes pour générer le PDF');
      return;
    }

    try {
      setIsGenerating(true);
      toast.info('Génération du PDF en cours...');

      // Attendre un peu que le contenu soit rendu
      await new Promise(resolve => setTimeout(resolve, 500));

      const element = printRef.current;
      
      const options = {
        margin: [10, 10, 10, 10],
        filename: `Synthese_Affaire_${affaire.numero}_${new Date().toISOString().split('T')[0]}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 1.5,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          scrollX: 0,
          scrollY: 0,
          width: 800,
          height: 1200
        },
        jsPDF: { 
          unit: 'mm', 
          format: 'a4', 
          orientation: 'portrait' 
        },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
      };

      await html2pdf().set(options).from(element).save();
      toast.success('PDF généré avec succès !');
    } catch (error) {
      console.error('Erreur lors de la génération du PDF:', error);
      toast.error('Erreur lors de la génération du PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Bouton d'export */}
      <div className="flex justify-end mb-4">
        <Button
          onClick={generatePDF}
          disabled={isGenerating}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <IconPrinter className="w-4 h-4" />
          {isGenerating ? 'Génération...' : 'Exporter en PDF'}
        </Button>
      </div>

      {/* Contenu à imprimer */}
      <div 
        ref={printRef} 
        className={`print-content bg-white p-6 rounded-lg border ${isGenerating ? 'block' : 'hidden'}`}
        style={{ 
          width: '800px',
          minHeight: '1000px',
          fontSize: '14px',
          lineHeight: '1.6',
          fontFamily: 'Arial, sans-serif',
          color: '#000000'
        }}
      >
        {/* En-tête du document */}
        <div className="mb-8 border-b-2 border-gray-300 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                SYNTHÈSE D'AFFAIRE
              </h1>
              <div className="text-xl font-semibold text-blue-600">
                {affaire?.numero} - {affaire?.libelle}
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div className="mb-1">Généré le : {formatDate(new Date())}</div>
              <div>Client : {affaire?.client}</div>
            </div>
          </div>
        </div>

        {/* Informations générales */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-blue-500 pl-3">
            Informations Générales
          </h2>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div className="space-y-2">
              <div><strong>Statut :</strong> {affaire?.statut}</div>
              <div><strong>Date de commencement :</strong> {formatDate(affaire?.dateCommencement)}</div>
            </div>
            <div className="space-y-2">
              <div><strong>Date de clôture prévue :</strong> {formatDate(affaire?.dateCloturePrevue)}</div>
              <div><strong>Adresse :</strong> {affaire?.adresse || affaire?.ville || 'Non renseignée'}</div>
            </div>
          </div>
        </div>

        {/* Métriques financières clés */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-green-500 pl-3">
            Métriques Financières
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <div className="text-sm text-blue-600 font-semibold mb-2">CA OBJECTIF</div>
              <div className="text-xl font-bold text-blue-900">
                {formatCurrency(financialData?.objectifCA)}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <div className="text-sm text-green-600 font-semibold mb-2">CA RÉALISÉ</div>
              <div className="text-xl font-bold text-green-900">
                {formatCurrency(financialData?.caReel)}
              </div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
              <div className="text-sm text-orange-600 font-semibold mb-2">AVANCEMENT</div>
              <div className="text-xl font-bold text-orange-900">
                {financialData?.objectifCA > 0 ? Math.round((financialData?.caReel / financialData?.objectifCA) * 100) : 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Répartition des coûts */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 border-l-4 border-purple-500 pl-3">
            Répartition des Coûts
          </h2>
          <div className="grid grid-cols-2 gap-8">
            {/* Prévisions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-700 mb-3 text-lg">PRÉVISIONS</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Achats :</span>
                  <span className="font-semibold">
                    {formatCurrency(financialData?.objectifAchats)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Main-d'œuvre :</span>
                  <span className="font-semibold">
                    {formatCurrency(financialData?.coutObjectifMainOeuvre)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Frais généraux :</span>
                  <span className="font-semibold">
                    {formatCurrency(financialData?.fraisGenerauxObjectifs)}
                  </span>
                </div>
                <div className="flex justify-between border-t-2 border-gray-400 pt-2">
                  <span className="font-bold">Marge prévue :</span>
                  <span className={`font-bold text-lg ${financialData?.margeObjectif >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(financialData?.margeObjectif)}
                  </span>
                </div>
              </div>
            </div>

            {/* Réalisations */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-700 mb-3 text-lg">RÉALISATIONS</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Achats :</span>
                  <span className="font-semibold">
                    {formatCurrency(financialData?.achatReel)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Main-d'œuvre :</span>
                  <span className="font-semibold">
                    {formatCurrency(financialData?.totalMainOeuvreReelle)}
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span>Frais généraux :</span>
                  <span className="font-semibold">
                    {formatCurrency(financialData?.fraisGenerauxReels)}
                  </span>
                </div>
                <div className="flex justify-between border-t-2 border-gray-400 pt-2">
                  <span className="font-bold">Marge réelle :</span>
                  <span className={`font-bold text-lg ${financialData?.margeReelle >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {formatCurrency(financialData?.margeReelle)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alertes si marge négative */}
        {financialData?.margeReelle < 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-red-800 mb-4 border-l-4 border-red-500 pl-3">
              ⚠️ Alertes
            </h2>
            <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
              <div className="text-red-800 font-semibold mb-2">
                Marge négative détectée !
              </div>
              <div className="text-red-700 text-sm">
                Cette affaire présente une marge négative de {formatCurrency(Math.abs(financialData?.margeReelle))}.
                Un déficit de {Math.round(Math.abs(financialData?.margeReelle) / financialData?.caReel * 100)}% du CA est constaté.
              </div>
            </div>
          </div>
        )}

        {/* Pied de page */}
        <div className="mt-12 pt-4 border-t-2 border-gray-300 text-center text-xs text-gray-500">
          <div>Document généré automatiquement le {new Date().toLocaleString('fr-FR')}</div>
          <div className="mt-1">Synthèse d'affaire - {affaire?.numero}</div>
        </div>
      </div>
    </div>
  );
};

export default AffairePdfExport; 