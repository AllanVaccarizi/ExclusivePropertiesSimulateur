// Widget Simulateur Location Courte Durée - Version Embeddable
// Version: 1.0.0
// Usage: <script src="simulateur-location-widget.js"></script>
//        <div id="simulateur-location"></div>

(function() {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    
    const defaultConfig = {
        containerId: 'simulateur-location',
        emailjs: {
            publicKey: 'XtLTL6RMg6LAc5Ck4',
            serviceId: 'service_p2gxskg',
            templateId: 'template_pd3f75l'
        },
        debug: false,
        theme: {
            primaryColor: '#000000',
            secondaryColor: '#666666',
            borderRadius: '8px'
        }
    };

    // ============================================
    // DONNÉES TARIFAIRES
    // ============================================
    
    const pricingData = {
        megeve: {
            name: "Megève",
            types: {
                studio: { name: "Studio", price: 6000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t1t2: { name: "T1 à T2 Appartement", price: 8500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                t3t4: { name: "T3 à T4 Appartement", price: 14000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                t5: { name: "T5 Appartement", price: 20000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 750 },
                maison: { name: "Maison", price: 23000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 1400 },
                chalet: { name: "Chalet", price: 35000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 3750 }
            }
        },
        valthorens: {
            name: "Val Thorens",
            types: {
                studio: { name: "Studio", price: 4500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t1t2: { name: "T1 à T2 Appartement", price: 7500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                t3t4: { name: "T3 à T4 Appartement", price: 10000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 1000 },
                t5: { name: "T5 Appartement", price: 12000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 1000 },
                maison: { name: "Maison", price: 13500, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 300 },
                chalet: { name: "Chalet", price: 20000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 2500 }
            }
        },
        courchevel: {
            name: "Courchevel",
            types: {
                studio: { name: "Studio", price: 5000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                t1t2: { name: "T1 à T2 Appartement", price: 7500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                t3t4: { name: "T3 à T4 Appartement", price: 12000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 1000 },
                t5: { name: "T5 Appartement", price: 14000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 1000 },
                maison: { name: "Maison", price: 15000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 1000 },
                chalet: { name: "Chalet", price: 30000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 5000 }
            }
        },
        lesarcs: {
            name: "Les Arcs",
            types: {
                studio: { name: "Studio", price: 4000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                t1t2: { name: "T1 à T2 Appartement", price: 6000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                t3t4: { name: "T3 à T4 Appartement", price: 8000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 1000 },
                t5: { name: "T5 Appartement", price: 10000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 1000 },
                maison: { name: "Maison", price: 15000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 1000 },
                chalet: { name: "Chalet", price: 18000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 1750 }
            }
        },
        laplagne: {
            name: "La Plagne",
            types: {
                studio: { name: "Studio", price: 3000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t1t2: { name: "T1 à T2 Appartement", price: 4000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t3t4: { name: "T3 à T4 Appartement", price: 6000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                t5: { name: "T5 Appartement", price: 7000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 500 },
                maison: { name: "Maison", price: 8000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 200 },
                chalet: { name: "Chalet", price: 10000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 750 }
            }
        },
        tignes: {
            name: "Tignes",
            types: {
                studio: { name: "Studio", price: 3500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 150 },
                t1t2: { name: "T1 à T2 Appartement", price: 4000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t3t4: { name: "T3 à T4 Appartement", price: 5000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t5: { name: "T5 Appartement", price: 6500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                maison: { name: "Maison", price: 8000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 100 },
                chalet: { name: "Chalet", price: 8000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 375 }
            }
        },
        chamonix: {
            name: "Chamonix Mont Blanc",
            types: {
                studio: { name: "Studio", price: 3000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 150 },
                t1t2: { name: "T1 à T2 Appartement", price: 3500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t3t4: { name: "T3 à T4 Appartement", price: 6000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t5: { name: "T5 Appartement", price: 8500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                maison: { name: "Maison", price: 10000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 400 },
                chalet: { name: "Chalet", price: 11500, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 375 }
            }
        },
        avoriaz: {
            name: "Avoriaz",
            types: {
                studio: { name: "Studio", price: 4000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t1t2: { name: "T1 à T2 Appartement", price: 4500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t3t4: { name: "T3 à T4 Appartement", price: 7000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t5: { name: "T5 Appartement", price: 9000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                maison: { name: "Maison", price: 10000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 600 },
                chalet: { name: "Chalet", price: 10000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 1250 }
            }
        },
        lesgets: {
            name: "Les Gets",
            types: {
                studio: { name: "Studio", price: 2000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 150 },
                t1t2: { name: "T1 à T2 Appartement", price: 3000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 150 },
                t3t4: { name: "T3 à T4 Appartement", price: 6000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t5: { name: "T5 Appartement", price: 9000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                maison: { name: "Maison", price: 11000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 400 },
                chalet: { name: "Chalet", price: 12000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 750 }
            }
        },
        laclusaz: {
            name: "La Clusaz",
            types: {
                studio: { name: "Studio", price: 2500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 150 },
                t1t2: { name: "T1 à T2 Appartement", price: 3000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 150 },
                t3t4: { name: "T3 à T4 Appartement", price: 6000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t5: { name: "T5 Appartement", price: 10500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                maison: { name: "Maison", price: 13000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 400 },
                chalet: { name: "Chalet", price: 14000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 750 }
            }
        },
        autres: {
            name: "Autres stations (73, 74)",
            types: {
                studio: { name: "Studio", price: 2500, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 150 },
                t1t2: { name: "T1 à T2 Appartement", price: 3000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 150 },
                t3t4: { name: "T3 à T4 Appartement", price: 5000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                t5: { name: "T5 Appartement", price: 7000, equipments: ["Terrasse", "Parking privé"], equipmentPrice: 250 },
                maison: { name: "Maison", price: 10000, equipments: ["Parking privé", "Cheminée", "Sauna ou Hammam", "Jacuzzi"], equipmentPrice: 400 },
                chalet: { name: "Chalet", price: 11000, equipments: ["Sauna et/ou Hammam", "Jacuzzi", "Piscine"], equipmentPrice: 750 }
            }
        }
    };

    // ============================================
    // CSS
    // ============================================
    
    const simulatorCSS = `
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@700&family=Raleway:wght@400;500;600&display=swap');

        .location-simulator-widget * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        .location-simulator-widget {
            font-family: 'Raleway', sans-serif;
            background-color: #ffffff;
            color: #000000;
            max-width: 1200px;
            margin: 0 auto;
            padding: 40px 20px;
        }

        .location-simulator-widget h1 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 2.5rem;
            text-align: center;
            margin-bottom: 40px;
            color: #000000;
        }

        .location-form-container {
            display: flex;
            gap: 15px;
            align-items: flex-end;
            flex-wrap: wrap;
            margin-bottom: 30px;
        }

        .location-form-group {
            flex: 1;
            min-width: 200px;
        }

        .location-form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 0.95rem;
        }

        .location-form-group select,
        .location-dropdown-container {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-family: 'Raleway', sans-serif;
            font-size: 1rem;
            background-color: #ffffff;
            color: #000000;
            cursor: pointer;
            transition: border-color 0.3s;
        }

        .location-dropdown-wrapper {
            position: relative;
            width: 100%;
        }

        .location-dropdown-container {
            position: relative;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .location-dropdown-container:hover {
            border-color: #4a5568;
        }

        .location-dropdown-selected {
            flex: 1;
            color: #666;
        }

        .location-dropdown-selected.has-selection {
            color: #000000;
        }

        .location-dropdown-arrow {
            margin-left: 10px;
            font-size: 0.8rem;
        }

        .location-dropdown-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #ffffff;
            border: 2px solid #4a5568;
            border-radius: 8px;
            margin-top: 4px;
            max-height: 250px;
            overflow-y: auto;
            z-index: 1000;
            display: none;
        }

        .location-dropdown-menu.show {
            display: block;
        }

        .location-dropdown-option {
            padding: 10px 12px;
            cursor: pointer;
            transition: background-color 0.2s;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .location-dropdown-option:hover {
            background-color: #f5f5f5;
        }

        .location-dropdown-option input[type="checkbox"] {
            cursor: pointer;
        }

        .location-btn {
            padding: 12px 30px;
            background-color: #000000;
            color: #ffffff;
            border: none;
            border-radius: 8px;
            font-family: 'Raleway', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: background-color 0.3s;
            min-width: 150px;
        }

        .location-btn:hover {
            background-color: #333333;
        }

        .location-btn:disabled {
            background-color: #cccccc;
            cursor: not-allowed;
        }

        .location-email-container {
            display: none;
            text-align: center;
            padding: 40px;
            background-color: #f9f9f9;
            border-radius: 12px;
            animation: locationFadeIn 0.5s;
            max-width: 600px;
            margin: 0 auto;
        }

        .location-email-container.show {
            display: block;
        }

        .location-email-container h2 {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.8rem;
            margin-bottom: 15px;
        }

        .location-email-container p {
            color: #666;
            margin-bottom: 30px;
            font-size: 1rem;
        }

        .location-email-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
            align-items: center;
        }

        .location-email-input-group {
            width: 100%;
            max-width: 400px;
        }

        .location-email-input-group input[type="email"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #e0e0e0;
            border-radius: 8px;
            font-family: 'Raleway', sans-serif;
            font-size: 1rem;
            background-color: #ffffff;
            color: #000000;
            transition: border-color 0.3s;
        }

        .location-email-input-group input[type="email"]:focus {
            outline: none;
            border-color: #4a5568;
        }

        .location-result-container {
            display: none;
            text-align: center;
            padding: 40px;
            background-color: #f9f9f9;
            border-radius: 12px;
            animation: locationFadeIn 0.5s;
        }

        .location-result-container.show {
            display: block;
        }

        @keyframes locationFadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .location-result-amount {
            font-size: 3.5rem;
            font-weight: 700;
            color: #000000;
            margin: 20px 0;
        }

        .location-result-label {
            font-size: 1.2rem;
            color: #666;
            margin-bottom: 10px;
        }

        .location-result-disclaimer {
            font-size: 0.9rem;
            color: #888;
            margin-top: 20px;
            font-style: italic;
        }

        .location-result-details {
            margin-top: 30px;
            padding: 20px;
            background-color: #ffffff;
            border-radius: 8px;
            text-align: left;
        }

        .location-result-details h3 {
            font-family: 'Space Grotesk', sans-serif;
            margin-bottom: 15px;
            font-size: 1.3rem;
        }

        .location-detail-line {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f0f0f0;
        }

        .location-detail-line:last-child {
            border-bottom: none;
            font-weight: 600;
            font-size: 1.1rem;
            padding-top: 15px;
        }

        .location-reset-button {
            margin-top: 30px;
            background-color: #666;
        }

        .location-reset-button:hover {
            background-color: #888;
        }

        .location-back-button {
            background-color: #666;
            margin-right: 10px;
        }

        .location-back-button:hover {
            background-color: #888;
        }

        .location-button-group {
            display: flex;
            gap: 10px;
            justify-content: center;
            flex-wrap: wrap;
        }

        .location-error-message {
            color: #d32f2f;
            font-size: 0.9rem;
            margin-top: 5px;
            display: none;
        }

        .location-error-message.show {
            display: block;
        }

        .location-success-message {
            color: #2e7d32;
            font-size: 0.9rem;
            margin-top: 5px;
            display: none;
        }

        .location-success-message.show {
            display: block;
        }

        .location-loading {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 3px solid #f3f3f3;
            border-top: 3px solid #000000;
            border-radius: 50%;
            animation: locationSpin 1s linear infinite;
            margin-left: 10px;
        }

        @keyframes locationSpin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .location-simulator-widget h1 {
                font-size: 2rem;
            }

            .location-form-container {
                flex-direction: column;
            }

            .location-form-group {
                width: 100%;
            }

            .location-btn {
                width: 100%;
            }

            .location-result-amount {
                font-size: 2.5rem;
            }

            .location-button-group {
                flex-direction: column;
                width: 100%;
            }

            .location-back-button {
                margin-right: 0;
            }
        }
    `;

    // ============================================
    // HTML
    // ============================================
    
    const simulatorHTML = `
        <div class="location-simulator-widget">
            <h1>Simulateur location courte durée</h1>
            
            <div class="location-form-container" id="locationFormContainer">
                <div class="location-form-group">
                    <label for="location-zone">Zone du logement *</label>
                    <select id="location-zone" required>
                        <option value="">Sélectionnez une zone</option>
                        <option value="megeve">Megève</option>
                        <option value="valthorens">Val Thorens</option>
                        <option value="courchevel">Courchevel</option>
                        <option value="lesarcs">Les Arcs</option>
                        <option value="laplagne">La Plagne</option>
                        <option value="tignes">Tignes</option>
                        <option value="chamonix">Chamonix Mont Blanc</option>
                        <option value="avoriaz">Avoriaz</option>
                        <option value="lesgets">Les Gets</option>
                        <option value="laclusaz">La Clusaz</option>
                        <option value="autres">Autres stations (73, 74)</option>
                    </select>
                </div>

                <div class="location-form-group">
                    <label for="location-logement">Type de logement *</label>
                    <select id="location-logement" required disabled>
                        <option value="">Sélectionnez un type</option>
                    </select>
                </div>

                <div class="location-form-group">
                    <label for="location-equipements">Équipements supplémentaires</label>
                    <div class="location-dropdown-wrapper">
                        <div class="location-dropdown-container" id="locationDropdownContainer">
                            <span class="location-dropdown-selected" id="locationDropdownSelected">Sélectionner des équipements</span>
                            <span class="location-dropdown-arrow">▼</span>
                        </div>
                        <div class="location-dropdown-menu" id="locationDropdownMenu"></div>
                    </div>
                </div>

                <div class="location-form-group">
                    <button type="button" class="location-btn" id="locationCalculateBtn">Calculer</button>
                </div>
            </div>

            <div class="location-email-container" id="locationEmailContainer">
                <h2>Dernière étape !</h2>
                <p>Entrez votre adresse email pour recevoir votre estimation détaillée</p>
                
                <div class="location-email-form">
                    <div class="location-email-input-group">
                        <input 
                            type="email" 
                            id="locationUserEmail" 
                            placeholder="votre@email.fr"
                            required
                        >
                        <div class="location-error-message" id="locationEmailError">Veuillez entrer une adresse email valide</div>
                        <div class="location-success-message" id="locationEmailSuccess">Email envoyé avec succès !</div>
                    </div>
                    
                    <div class="location-button-group">
                        <button class="location-btn location-back-button" id="locationBackBtn">Retour</button>
                        <button class="location-btn" id="locationSubmitBtn">Voir les résultats</button>
                    </div>
                </div>
            </div>

            <div class="location-result-container" id="locationResultContainer">
                <div class="location-result-label">Estimation de vos revenus mensuels</div>
                <div class="location-result-amount" id="locationResultAmount">0 €</div>
                
                <div class="location-result-details" id="locationResultDetails"></div>
                
                <div class="location-result-disclaimer">
                    *Ceci n'est qu'une estimation basée sur des données moyennes. Les revenus réels peuvent varier en fonction de nombreux facteurs.
                </div>
                
                <button class="location-btn location-reset-button" id="locationResetBtn">Nouvelle simulation</button>
            </div>
        </div>
    `;

    // ============================================
    // CLASSE PRINCIPALE
    // ============================================
    
    class SimulateurLocationWidget {
        constructor(config = {}) {
            this.config = Object.assign({}, defaultConfig, config);
            this.container = document.getElementById(this.config.containerId);
            this.selectedEquipments = [];
            this.calculatedData = null;
            
            if (!this.container) {
                console.error(`Element with ID '${this.config.containerId}' not found`);
                return;
            }
            
            this.init();
        }

        init() {
            this.injectStyles();
            this.injectHTML();
            this.initEmailJS();
            this.bindEvents();
        }

        injectStyles() {
            if (!document.querySelector('#location-simulator-styles')) {
                const style = document.createElement('style');
                style.id = 'location-simulator-styles';
                style.textContent = simulatorCSS;
                document.head.appendChild(style);
            }
        }

        injectHTML() {
            this.container.innerHTML = simulatorHTML;
        }

        initEmailJS() {
            if (typeof emailjs !== 'undefined') {
                emailjs.init(this.config.emailjs.publicKey);
            }
        }

        bindEvents() {
            const widget = this.container.querySelector('.location-simulator-widget');
            
            // Zone select
            widget.querySelector('#location-zone').addEventListener('change', (e) => {
                this.onZoneChange(e.target.value);
            });

            // Logement select
            widget.querySelector('#location-logement').addEventListener('change', (e) => {
                this.onLogementChange(e.target.value);
            });

            // Dropdown équipements
            widget.querySelector('#locationDropdownContainer').addEventListener('click', (e) => {
                e.stopPropagation();
                widget.querySelector('#locationDropdownMenu').classList.toggle('show');
            });

            document.addEventListener('click', () => {
                widget.querySelector('#locationDropdownMenu').classList.remove('show');
            });

            // Boutons
            widget.querySelector('#locationCalculateBtn').addEventListener('click', () => {
                this.goToEmailStep();
            });

            widget.querySelector('#locationBackBtn').addEventListener('click', () => {
                this.backToForm();
            });

            widget.querySelector('#locationSubmitBtn').addEventListener('click', () => {
                this.showResults();
            });

            widget.querySelector('#locationResetBtn').addEventListener('click', () => {
                this.resetSimulator();
            });

            // Email input - Enter key
            widget.querySelector('#locationUserEmail').addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.showResults();
                }
            });
        }

        onZoneChange(zone) {
            const widget = this.container.querySelector('.location-simulator-widget');
            const logementSelect = widget.querySelector('#location-logement');
            
            this.selectedEquipments = [];
            this.updateDropdownDisplay();
            widget.querySelector('#locationDropdownMenu').innerHTML = '';
            
            if (zone) {
                logementSelect.disabled = false;
                logementSelect.innerHTML = '<option value="">Sélectionnez un type</option>';
                
                const types = pricingData[zone].types;
                for (const [key, value] of Object.entries(types)) {
                    const option = document.createElement('option');
                    option.value = key;
                    option.textContent = value.name;
                    logementSelect.appendChild(option);
                }
            } else {
                logementSelect.disabled = true;
                logementSelect.innerHTML = '<option value="">Sélectionnez un type</option>';
            }
        }

        onLogementChange(logement) {
            const widget = this.container.querySelector('.location-simulator-widget');
            const zone = widget.querySelector('#location-zone').value;
            
            this.selectedEquipments = [];
            this.updateDropdownDisplay();
            
            if (zone && logement) {
                const equipments = pricingData[zone].types[logement].equipments;
                this.updateDropdownMenu(equipments);
            } else {
                widget.querySelector('#locationDropdownMenu').innerHTML = '';
            }
        }

        updateDropdownMenu(equipments) {
            const widget = this.container.querySelector('.location-simulator-widget');
            const menu = widget.querySelector('#locationDropdownMenu');
            menu.innerHTML = '';
            
            equipments.forEach(equipment => {
                const option = document.createElement('div');
                option.className = 'location-dropdown-option';
                option.innerHTML = `
                    <input type="checkbox" id="eq_${equipment}" value="${equipment}" ${this.selectedEquipments.includes(equipment) ? 'checked' : ''}>
                    <label for="eq_${equipment}" style="cursor: pointer; flex: 1;">${equipment}</label>
                `;
                
                option.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const checkbox = option.querySelector('input[type="checkbox"]');
                    checkbox.checked = !checkbox.checked;
                    
                    if (checkbox.checked) {
                        if (!this.selectedEquipments.includes(equipment)) {
                            this.selectedEquipments.push(equipment);
                        }
                    } else {
                        this.selectedEquipments = this.selectedEquipments.filter(eq => eq !== equipment);
                    }
                    
                    this.updateDropdownDisplay();
                });
                
                menu.appendChild(option);
            });
        }

        updateDropdownDisplay() {
            const widget = this.container.querySelector('.location-simulator-widget');
            const display = widget.querySelector('#locationDropdownSelected');
            
            if (this.selectedEquipments.length === 0) {
                display.textContent = 'Sélectionner des équipements';
                display.classList.remove('has-selection');
            } else {
                display.textContent = this.selectedEquipments.join(', ');
                display.classList.add('has-selection');
            }
        }

        goToEmailStep() {
            const widget = this.container.querySelector('.location-simulator-widget');
            const zone = widget.querySelector('#location-zone').value;
            const logement = widget.querySelector('#location-logement').value;
            
            if (!zone || !logement) {
                alert('Veuillez sélectionner une zone et un type de logement');
                return;
            }
            
            const data = pricingData[zone].types[logement];
            const basePrice = data.price;
            const equipmentPrice = data.equipmentPrice;
            const equipmentCount = this.selectedEquipments.length;
            const totalEquipmentCost = equipmentPrice * equipmentCount;
            const totalRevenue = basePrice + totalEquipmentCost;
            
            this.calculatedData = {
                zone: zone,
                zoneName: pricingData[zone].name,
                logementName: data.name,
                basePrice: basePrice,
                equipmentPrice: equipmentPrice,
                equipmentCount: equipmentCount,
                equipments: this.selectedEquipments.join(', ') || 'Aucun',
                totalEquipmentCost: totalEquipmentCost,
                totalRevenue: totalRevenue
            };
            
            widget.querySelector('#locationFormContainer').style.display = 'none';
            widget.querySelector('#locationEmailContainer').classList.add('show');
            
            setTimeout(() => {
                widget.querySelector('#locationUserEmail').focus();
            }, 100);
        }

        backToForm() {
            const widget = this.container.querySelector('.location-simulator-widget');
            widget.querySelector('#locationEmailContainer').classList.remove('show');
            widget.querySelector('#locationFormContainer').style.display = 'flex';
            widget.querySelector('#locationEmailError').classList.remove('show');
            widget.querySelector('#locationEmailSuccess').classList.remove('show');
        }

        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        async showResults() {
            const widget = this.container.querySelector('.location-simulator-widget');
            const email = widget.querySelector('#locationUserEmail').value.trim();
            const errorMessage = widget.querySelector('#locationEmailError');
            const successMessage = widget.querySelector('#locationEmailSuccess');
            const submitBtn = widget.querySelector('#locationSubmitBtn');
            
            errorMessage.classList.remove('show');
            successMessage.classList.remove('show');
            
            if (!email || !this.validateEmail(email)) {
                errorMessage.classList.add('show');
                widget.querySelector('#locationUserEmail').focus();
                return;
            }
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Envoi en cours...<span class="location-loading"></span>';
            
            try {
                if (typeof emailjs !== 'undefined') {
                    const templateParams = {
                        user_email: email,
                        zone: this.calculatedData.zoneName,
                        logement: this.calculatedData.logementName,
                        equipements: this.calculatedData.equipments,
                        revenu_base: this.calculatedData.basePrice.toLocaleString('fr-FR') + ' €',
                        cout_equipements: this.calculatedData.totalEquipmentCost.toLocaleString('fr-FR') + ' €',
                        revenu_total: this.calculatedData.totalRevenue.toLocaleString('fr-FR') + ' €',
                        date: new Date().toLocaleDateString('fr-FR')
                    };
                    
                    await emailjs.send(
                        this.config.emailjs.serviceId,
                        this.config.emailjs.templateId,
                        templateParams
                    );
                    
                    successMessage.classList.add('show');
                }
                
                setTimeout(() => {
                    this.displayResults();
                }, 1000);
                
            } catch (error) {
                console.error('Erreur lors de l\'envoi de l\'email:', error);
                alert('Une erreur est survenue lors de l\'envoi de l\'email, mais vous pouvez consulter vos résultats ci-dessous.');
                this.displayResults();
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Voir les résultats';
            }
        }

        displayResults() {
            const widget = this.container.querySelector('.location-simulator-widget');
            
            widget.querySelector('#locationResultAmount').textContent = 
                this.calculatedData.totalRevenue.toLocaleString('fr-FR') + ' €';
            
            let detailsHTML = '<h3>Détail du calcul</h3>';
            detailsHTML += `<div class="location-detail-line"><span>Zone :</span><span>${this.calculatedData.zoneName}</span></div>`;
            detailsHTML += `<div class="location-detail-line"><span>Type de logement :</span><span>${this.calculatedData.logementName}</span></div>`;
            detailsHTML += `<div class="location-detail-line"><span>Revenu de base :</span><span>${this.calculatedData.basePrice.toLocaleString('fr-FR')} €</span></div>`;
            
            if (this.calculatedData.equipmentCount > 0) {
                detailsHTML += `<div class="location-detail-line"><span>Équipements (${this.calculatedData.equipmentCount}) :</span><span>${this.calculatedData.totalEquipmentCost.toLocaleString('fr-FR')} €</span></div>`;
                this.selectedEquipments.forEach(eq => {
                    detailsHTML += `<div class="location-detail-line" style="padding-left: 20px; font-size: 0.9rem; color: #666;"><span>• ${eq}</span><span>${this.calculatedData.equipmentPrice.toLocaleString('fr-FR')} €</span></div>`;
                });
            }
            
            detailsHTML += `<div class="location-detail-line"><span>Total mensuel estimé :</span><span>${this.calculatedData.totalRevenue.toLocaleString('fr-FR')} €</span></div>`;
            
            widget.querySelector('#locationResultDetails').innerHTML = detailsHTML;
            
            widget.querySelector('#locationEmailContainer').classList.remove('show');
            widget.querySelector('#locationResultContainer').classList.add('show');
        }

        resetSimulator() {
            const widget = this.container.querySelector('.location-simulator-widget');
            
            widget.querySelector('#location-zone').value = '';
            widget.querySelector('#location-logement').value = '';
            widget.querySelector('#location-logement').disabled = true;
            widget.querySelector('#locationUserEmail').value = '';
            this.selectedEquipments = [];
            this.calculatedData = null;
            this.updateDropdownDisplay();
            widget.querySelector('#locationDropdownMenu').innerHTML = '';
            widget.querySelector('#locationEmailError').classList.remove('show');
            widget.querySelector('#locationEmailSuccess').classList.remove('show');
            
            widget.querySelector('#locationFormContainer').style.display = 'flex';
            widget.querySelector('#locationResultContainer').classList.remove('show');
        }
    }

    // ============================================
    // API GLOBALE
    // ============================================
    
    window.SimulateurLocation = {
        init: function(config = {}) {
            return new SimulateurLocationWidget(config);
        },
        
        auto: function(config = {}) {
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => {
                    return new SimulateurLocationWidget(config);
                });
            } else {
                return this.init(config);
            }
        },
        
        version: '1.0.0'
    };

    // Auto-initialisation
    function autoInit() {
        const defaultContainer = document.getElementById('simulateur-location');
        if (defaultContainer && !defaultContainer.hasAttribute('data-manual-init')) {
            new SimulateurLocationWidget();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }

})();