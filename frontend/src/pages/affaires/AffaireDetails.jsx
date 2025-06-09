import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  IconArrowLeft,
  IconPencil,
  IconTrash,
  IconBriefcase,
  IconUser,
  IconMapPin,
  IconCalendarEvent,
  IconCurrencyEuro,
  IconFileText,
  IconCheck,
  IconClock,
  IconX,
  IconAlertCircle
} from '@tabler/icons-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import affairesService from '../../services/affairesService';

const AffaireDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [affaire, setAffaire] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAffaire();
  }, [id]);

  const fetchAffaire = async () => {
    try {
      setLoading(true);
      const data = await affairesService.getAffaire(id);
      setAffaire(data);
    } catch (error) {
      console.error('Erreur lors du chargement de l\'affaire:', error);
      toast.error('Erreur lors du chargement de l\'affaire');
      navigate('/affaires');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'affaire "${affaire.libelle}" ?`)) {
      try {
        await affairesService.deleteAffaire(id);
        toast.success('Affaire supprimée avec succès');
        navigate('/affaires');
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
        toast.error('Erreur lors de la suppression de l\'affaire');
      }
    }
  };

  const getStatusBadge = (statut) => {
    const statusConfig = {
      'En cours': { color: 'bg-blue-100 text-blue-800', icon: IconClock },
      'Terminé': { color: 'bg-green-100 text-green-800', icon: IconCheck },
      'En attente': { color: 'bg-yellow-100 text-yellow-800', icon: IconClock },
      'Annulé': { color: 'bg-red-100 text-red-800', icon: IconX }
    };
    
    const config = statusConfig[statut] || { color: 'bg-gray-100 text-gray-800', icon: IconClock };
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${config.color}`}>
        <Icon className="w-4 h-4 mr-2" />
        {statut}
      </span>
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount || 0);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!affaire) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <IconAlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Affaire introuvable</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            L'affaire demandée n'existe pas ou a été supprimée.
          </p>
          <Button
            onClick={() => navigate('/affaires')}
            variant="primary"
          >
            Retour aux affaires
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate('/affaires')}
            variant="ghost"
            size="sm"
            icon={IconArrowLeft}
          >
            Retour
          </Button>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {affaire.numero}
              </h1>
              {getStatusBadge(affaire.statut)}
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400">{affaire.libelle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => navigate(`/affaires/${id}/modifier`)}
            variant="outline"
            icon={IconPencil}
          >
            Modifier
          </Button>
          <Button
            onClick={handleDelete}
            variant="outline"
            icon={IconTrash}
            className="text-red-600 hover:text-red-700 border-red-300 hover:border-red-400"
          >
            Supprimer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Informations générales */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconBriefcase className="w-5 h-5" />
              Informations générales
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Numéro</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{affaire.numero}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Statut</p>
                <div className="mt-1">
                  {getStatusBadge(affaire.statut)}
                </div>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Libellé</p>
              <p className="text-gray-900 dark:text-white">{affaire.libelle}</p>
            </div>
            
            {affaire.description && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Description</p>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{affaire.description}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informations client */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconUser className="w-5 h-5" />
              Informations client
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {affaire.client && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Client</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{affaire.client}</p>
              </div>
            )}
            
            {affaire.adresseChantier && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <IconMapPin className="w-4 h-4" />
                  Adresse du chantier
                </p>
                <p className="text-gray-900 dark:text-white whitespace-pre-wrap">{affaire.adresseChantier}</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Informations financières */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCurrencyEuro className="w-5 h-5" />
              Informations financières
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Montant du devis</p>
              <p className="text-2xl font-bold text-green-600">
                {affaire.montantDevis ? formatCurrency(affaire.montantDevis) : 'Non renseigné'}
              </p>
            </div>
            
            {/* Ici on pourrait ajouter d'autres métriques financières comme le coût réel, la marge, etc. */}
          </CardContent>
        </Card>

        {/* Planning */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <IconCalendarEvent className="w-5 h-5" />
              Planning
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {affaire.dateDebut && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de début</p>
                  <p className="text-gray-900 dark:text-white">{formatDate(affaire.dateDebut)}</p>
                </div>
              )}
              
              {affaire.dateFin && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date de fin prévue</p>
                  <p className="text-gray-900 dark:text-white">{formatDate(affaire.dateFin)}</p>
                </div>
              )}
              
              {affaire.dateDebut && affaire.dateFin && (
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Durée prévue</p>
                  <p className="text-gray-900 dark:text-white">
                    {Math.ceil((new Date(affaire.dateFin) - new Date(affaire.dateDebut)) / (1000 * 60 * 60 * 24))} jours
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle>Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to={`/pointages?affaire=${affaire.id}`}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <IconClock className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Pointages</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Voir les heures travaillées</p>
            </Link>
            
            <Link
              to={`/bdc?affaire=${affaire.id}`}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <IconCurrencyEuro className="w-8 h-8 text-green-600 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Bons de commande</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gérer les achats</p>
            </Link>
            
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 opacity-50">
              <IconFileText className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Documents</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bientôt disponible</p>
            </div>
            
            <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 opacity-50">
              <IconUser className="w-8 h-8 text-orange-600 mb-2" />
              <h3 className="font-medium text-gray-900 dark:text-white">Équipe</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">Bientôt disponible</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations système */}
      <Card>
        <CardHeader>
          <CardTitle>Informations système</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div>
              <p className="font-medium">Créée le</p>
              <p>{formatDate(affaire.createdAt)}</p>
            </div>
            <div>
              <p className="font-medium">Dernière modification</p>
              <p>{formatDate(affaire.updatedAt)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AffaireDetails; 