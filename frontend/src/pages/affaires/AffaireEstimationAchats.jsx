import React from 'react';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Import des composants modulaires
import { 
  ChartControlPanel, 
  CategoryButton, 
  CreateCategoryForm,
  CATEGORIES_DEFAUT,
  ItemType
} from '../../components/affaires/estimation-achats';
import { useEstimationAchats } from '../../hooks/useEstimationAchats';

ChartJS.register(ArcElement, Tooltip, Legend);

// Zone de drop pour le camembert
const ChartDropZone = ({ children, onDrop, categoriesActives }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => {
      console.log('Item droppé:', item.categorie.nom, item.categorie.id);
      console.log('Catégories actives dans drop zone:', categoriesActives.map(c => `${c.nom} (${c.id})`));
      onDrop(item.categorie);
      },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`
        relative p-8 rounded-xl border-4 border-dashed transition-all duration-200
        ${isOver 
          ? 'border-blue-400 bg-blue-50' 
          : 'border-gray-300 bg-white'
        }
      `}
    >
      {children}
      {isOver && (
        <div className="absolute inset-0 bg-blue-100 bg-opacity-50 rounded-xl flex items-center justify-center">
          <div className="text-blue-600 font-semibold text-lg">
            Déposez la catégorie ici
          </div>
        </div>
      )}
    </div>
  );
};

// Composant pour afficher les labels autour du camembert
const ChartLabels = ({ categoriesActives, pourcentageNonAffecte, montantEstimationAchats }) => {
  // Calculer les positions des labels sur l'axe de chaque segment
  const getLabelsPositions = () => {
    // Utiliser des pourcentages relatifs au conteneur
    const centerX = 50; // 50% du conteneur
    const centerY = 50; // 50% du conteneur
    const innerRadius = 24; // 24% du conteneur (bord du camembert)
    const outerRadius = 38; // 38% du conteneur (position des labels)
    
    const labels = [];
    // Chart.js commence à -90° (12h sur une horloge) et va dans le sens horaire
    let currentAngle = -90; 
    
    categoriesActives.forEach((categorie, index) => {
      const percentage = categorie.pourcentage;
      const angle = (percentage / 100) * 360;
      
      // Calculer l'angle du milieu du segment (axe du segment)
      const midAngle = currentAngle + (angle / 2);
      
      // Convertir en radians
      const radians = (midAngle * Math.PI) / 180;
      
      // Position de départ de la ligne (bord du camembert) en pourcentages
      const lineStartX = centerX + Math.cos(radians) * innerRadius;
      const lineStartY = centerY + Math.sin(radians) * innerRadius;
      
      // Position de fin de la ligne et du label en pourcentages
      const lineEndX = centerX + Math.cos(radians) * outerRadius;
      const lineEndY = centerY + Math.sin(radians) * outerRadius;
      
      labels.push({
        ...categorie,
        x: lineEndX,
        y: lineEndY,
        lineStartX,
        lineStartY,
        lineEndX,
        lineEndY,
        angle: midAngle,
        isLeft: lineEndX < centerX // Pour l'alignement du texte
      });
      
      currentAngle += angle;
    });
    
    // Ajouter "Non affecté" si nécessaire
    if (pourcentageNonAffecte > 0) {
      const angle = (pourcentageNonAffecte / 100) * 360;
      const midAngle = currentAngle + (angle / 2);
      
      const radians = (midAngle * Math.PI) / 180;
      
      const lineStartX = centerX + Math.cos(radians) * innerRadius;
      const lineStartY = centerY + Math.sin(radians) * innerRadius;
      const lineEndX = centerX + Math.cos(radians) * outerRadius;
      const lineEndY = centerY + Math.sin(radians) * outerRadius;
      
      labels.push({
        id: 'non-affecte',
        nom: 'Non affecté',
        couleur: '#E5E7EB',
        pourcentage: pourcentageNonAffecte,
        x: lineEndX,
        y: lineEndY,
        lineStartX,
        lineStartY,
        lineEndX,
        lineEndY,
        angle: midAngle,
        isLeft: lineEndX < centerX
      });
    }
    
    return labels;
  };
  
  const labelsPositions = getLabelsPositions();
  
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* SVG pour toutes les lignes - utilise des pourcentages */}
      <svg 
        className="absolute inset-0 pointer-events-none w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid meet"
      >
        {labelsPositions.map((label, index) => (
          <line
            key={`line-${label.id}`}
            x1={label.lineStartX}
            y1={label.lineStartY}
            x2={label.lineEndX}
            y2={label.lineEndY}
            stroke={label.couleur}
            strokeWidth="0.4"
            opacity="0.8"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      
      {/* Labels positionnés en pourcentages */}
      {labelsPositions.map((label, index) => {
        // Déterminer la position optimale du label
        const isLeft = label.x < 50;
        const isTop = label.y < 50;
        
        return (
          <div
            key={`label-${label.id}`}
            className="absolute pointer-events-auto z-10"
            style={{
              left: `${label.x}%`,
              top: `${label.y}%`,
              transform: `translate(${isLeft ? '-100%' : '0%'}, -50%)`
            }}
          >
            <div 
              className="bg-white rounded-lg shadow-lg border-l-4 px-3 py-2 min-w-max whitespace-nowrap hover:shadow-xl transition-shadow duration-200"
              style={{ borderLeftColor: label.couleur }}
            >
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: label.couleur }}
                ></div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-gray-800">
                    {label.nom}
                  </div>
                  <div className="text-xs text-gray-600">
                    {label.pourcentage}%
                    {label.id !== 'non-affecte' && (
                      <span className="text-blue-600 font-medium ml-1">
                        ({(montantEstimationAchats * label.pourcentage / 100).toFixed(0)}€)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const AffaireEstimationAchats = () => {
  const { id } = useParams();
  
  // Utilisation du hook personnalisé pour toute la logique métier
  const {
    affaire,
    categoriesActives,
    categoriesPersonnalisees,
    editingCategoryId,
    montantTotalDevis,
    montantEstimationAchats,
    pourcentageBudgetAchats,
    toutesLesCategories,
    totalPourcentage,
    pourcentageNonAffecte,
    setEditingCategoryId,
    setPourcentageBudgetAchats,
    ajouterCategorie,
    retirerCategorie,
    modifierPourcentage,
    creerCategoriePersonnalisee,
    supprimerCategoriePersonnalisee,
    sauvegarderEstimation,
    rafraichirDonnees
  } = useEstimationAchats(id);

  // Données pour le camembert
  
  console.log('Rendu - Catégories actives:', categoriesActives.map(c => `${c.nom} (${c.pourcentage}%)`));
  console.log('Total pourcentage:', totalPourcentage);
  
  const chartData = {
    labels: [
      ...categoriesActives.map(c => c.nom),
      ...(pourcentageNonAffecte > 0 ? ['Non affecté'] : [])
    ],
    datasets: [
      {
        data: [
          ...categoriesActives.map(c => c.pourcentage),
          ...(pourcentageNonAffecte > 0 ? [pourcentageNonAffecte] : [])
        ],
        backgroundColor: [
          ...categoriesActives.map(c => c.couleur),
          ...(pourcentageNonAffecte > 0 ? ['#E5E7EB'] : [])
        ],
        borderColor: [
          ...categoriesActives.map(c => c.couleur),
          ...(pourcentageNonAffecte > 0 ? ['#9CA3AF'] : [])
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // On désactive la légende par défaut
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const montant = Math.round((value / 100) * montantEstimationAchats);
            return [`${label}: ${value}%`, `Montant: ${montant.toLocaleString()}€`];
          }
        }
      }
    },
    layout: {
      padding: {
        top: 60,
        bottom: 60,
        left: 60,
        right: 60
      }
    },
    elements: {
      arc: {
        borderWidth: 3,
        borderColor: '#ffffff',
        hoverBorderWidth: 4,
        hoverBorderColor: '#ffffff'
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeInOutQuart'
    }
  };

  if (!affaire) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto px-4 py-6">
        {/* En-tête */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Estimation des Achats
              </h1>
              <div className="text-lg text-gray-600">
                {affaire.numero} - {affaire.libelle} - {affaire.client}
              </div>
            </div>
            <button
              onClick={rafraichirDonnees}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              title="Actualiser les données des devis"
            >
              🔄 Actualiser
            </button>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600 font-medium">Total Devis Validés</div>
              <div className="text-2xl font-bold text-blue-900">
                {montantTotalDevis.toLocaleString()}€
              </div>
              <div className="text-xs text-blue-500 mt-1">
                Dernière mise à jour: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-sm text-green-600 font-medium flex items-center gap-2">
                Budget Achats (
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={pourcentageBudgetAchats}
                  onChange={(e) => setPourcentageBudgetAchats(parseInt(e.target.value) || 30)}
                  className="w-12 px-1 py-0.5 text-center border border-green-300 rounded text-green-700 bg-white focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
                %)
              </div>
              <div className="text-2xl font-bold text-green-900">
                {montantEstimationAchats.toLocaleString()}€
              </div>
            </div>
            <div className={`p-4 rounded-lg ${totalPourcentage === 100 ? 'bg-green-50' : 'bg-orange-50'}`}>
              <div className={`text-sm font-medium ${totalPourcentage === 100 ? 'text-green-600' : 'text-orange-600'}`}>
                Répartition
              </div>
              <div className={`text-2xl font-bold ${totalPourcentage === 100 ? 'text-green-900' : 'text-orange-900'}`}>
                {totalPourcentage}%
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Catégories disponibles */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Catégories d'Achats
            </h3>
            
            <div className="space-y-3">
              <div className="text-sm text-gray-600 mb-4">
                Glissez les catégories dans le camembert pour créer votre estimation
              </div>
              
              {/* Formulaire de création de catégorie personnalisée */}
              <div className="mb-6">
                <CreateCategoryForm 
                  onCreateCategory={creerCategoriePersonnalisee}
                  categoriesExistantes={toutesLesCategories}
                />
              </div>

              {/* Catégories prédéfinies non utilisées */}
              {CATEGORIES_DEFAUT.filter(cat => !categoriesActives.find(active => active.id === cat.id)).length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Catégories prédéfinies
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {CATEGORIES_DEFAUT.filter(cat => !categoriesActives.find(active => active.id === cat.id))
                      .map(categorie => (
                        <CategoryButton
                          key={categorie.id}
                          categorie={categorie}
                          isInChart={false}
                          editingCategoryId={editingCategoryId}
                          setEditingCategoryId={setEditingCategoryId}
                          montantEstimationAchats={montantEstimationAchats}
                        />
                      ))}
                  </div>
                </div>
              )}

              {/* Catégories personnalisées non utilisées */}
              {categoriesPersonnalisees.filter(cat => !categoriesActives.find(active => active.id === cat.id)).length > 0 && (
                <div className="space-y-2 mt-4">
                  <h4 className="text-sm font-semibold text-blue-700 uppercase tracking-wide">
                    Catégories personnalisées
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                                         {categoriesPersonnalisees.filter(cat => !categoriesActives.find(active => active.id === cat.id))
                       .map(categorie => (
                         <CategoryButton
                           key={categorie.id}
                           categorie={categorie}
                           isInChart={false}
                           onDelete={supprimerCategoriePersonnalisee}
                           editingCategoryId={editingCategoryId}
                           setEditingCategoryId={setEditingCategoryId}
                           montantEstimationAchats={montantEstimationAchats}
                         />
                       ))}
                  </div>
                </div>
              )}

              {/* Catégories utilisées */}
              {categoriesActives.length > 0 && (
                <div className="space-y-2 mt-6">
                  <h4 className="text-sm font-semibold text-green-700 uppercase tracking-wide">
                    Dans le camembert
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {categoriesActives.map(categorie => (
                      <CategoryButton
                        key={`${categorie.id}-${categorie._timestamp || 0}`}
                        categorie={categorie}
                        isInChart={true}
                        onRemove={retirerCategorie}
                        onUpdatePercentage={modifierPourcentage}
                        editingCategoryId={editingCategoryId}
                        setEditingCategoryId={setEditingCategoryId}
                        montantEstimationAchats={montantEstimationAchats}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Camembert */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Répartition des Achats
              </h2>
              
              <ChartDropZone onDrop={ajouterCategorie} categoriesActives={categoriesActives}>
                <div className="relative w-full h-[600px] flex items-center justify-center">
                  {/* Camembert central */}
                  <div className="w-[500px] h-[500px] relative">
                    <Pie 
                      data={chartData} 
                      options={chartOptions}
                    />
                    
                    {/* Centre du camembert avec informations */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-white rounded-full shadow-lg p-6 text-center border-4 border-gray-100">
                        <div className="text-2xl font-bold text-gray-800">
                          {totalPourcentage}%
                        </div>
                        <div className="text-sm text-gray-600">
                          Total affecté
                        </div>
                        <div className="text-lg font-semibold text-blue-600 mt-2">
                          {montantEstimationAchats.toLocaleString()}€
                        </div>
                        <div className="text-xs text-gray-500">
                          Budget total
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Labels autour du camembert */}
                  <ChartLabels 
              categoriesActives={categoriesActives} 
              pourcentageNonAffecte={pourcentageNonAffecte}
              montantEstimationAchats={montantEstimationAchats}
            />
                </div>
              </ChartDropZone>

              {/* Panneau de contrôle sous le camembert */}
              <div className="mt-6">
                <ChartControlPanel
                  categorieSelectionnee={categoriesActives.find(c => c.id === editingCategoryId)}
                  onUpdate={modifierPourcentage}
                  onDeselect={() => setEditingCategoryId(null)}
                  montantEstimationAchats={montantEstimationAchats}
                  totalPourcentage={totalPourcentage}
                />
              </div>

              {/* Alerte si dépassement */}
              {totalPourcentage > 100 && (
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center">
                    <div className="text-amber-600 mr-2">⚠️</div>
                    <div className="text-amber-800">
                      La répartition totale est de {totalPourcentage}%. Ajustez les pourcentages pour atteindre 100%.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end space-x-4">
          <button 
            className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            onClick={() => window.history.back()}
          >
            Annuler
          </button>
          <button 
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            disabled={totalPourcentage !== 100}
            onClick={sauvegarderEstimation}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Sauvegarder l'Estimation
          </button>
        </div>
      </div>
    </DndProvider>
  );
};

export default AffaireEstimationAchats; 