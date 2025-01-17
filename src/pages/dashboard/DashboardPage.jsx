import { useState } from "react";
import "./dashboardPage.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/logo.png";

import homeIcon from "../../assets/img/homeIcon.png";
import accountIcon from "../../assets/img/myAccountIcon.png";
import transerIcon from "../../assets/img/ranferIcon.png";
import queriesIcon from '../../assets/img/queriesIcon.png';
import servicesIcon from '../../assets/img/servicesIcon.png';
import historyIcon from '../../assets/img/historyIcon.png';
import currencyIcon from '../../assets/img/currencyIcon.png';
import helpIcon from '../../assets/img/helpIcon.png';
import logoutIcon from '../../assets/img/logoutIcon.png';

import { MyAccount } from "../myAccount/MyAccount";
import { Transfer } from "../transfer/Transfer";
import { Queries } from "../queries/Queries";
import { ServiciosPage } from "../service/ServicePage";
import { History } from "../history/History";
import { Currency } from "../currency/Currency";
import { Help } from "../help/Help";

const navItems = [
  { id: "home", label: "Home", icon: homeIcon },
  { id: "my-account", label: "My Account", icon: accountIcon },
  { id: "transfer", label: "Transfer", icon: transerIcon },
  { id: "queries", label: "Queries", icon: queriesIcon },
  { id: "services", label: "Services", icon: servicesIcon },
  { id: "history", label: "History", icon: historyIcon },
  { id: "currency", label: "Currency", icon: currencyIcon },
  { id: "help", label: "Help", icon: helpIcon },
  { id: "logout", label: "Logout", icon: logoutIcon }
];

const componentMap = {
  "home": <div>
    <img src="https://github.com/echamale-2022222/imagenes/blob/main/MicrosoftTeams-image.png?raw=true" alt="Logo" />
  </div>,
  "my-account": <MyAccount />,
  transfer: <Transfer />,
  queries: <Queries />,
  services: <ServiciosPage />,
  history: <History />,
  currency: <Currency />,
  help: <Help />,
};

export const DashboardPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home");
  const navigate = useNavigate();

  const handleNavClick = (id) => {
    if (id === "home") {
      window.location.reload();
    } else if (id === "logout") {
      handleLogout();
    } else {
      setActiveComponent(id);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="dashboard">
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-inner">
          <header className="sidebar-header">
            <button
              type="button"
              className="sidebar-burger"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>{isOpen ? "×" : "☰"}</span>
            </button>
            <img src={logo} className="sidebar-logo" alt="logo" />
            <p>Easy Bank Code</p>
          </header>
          <nav className="sidebar-menu">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`sidebar-button ${activeComponent === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
              >
                <img
                  src={item.icon}
                  alt={`${item.label} icon`}
                  className="sidebar-icon"
                />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
      <main className="content">
        {componentMap[activeComponent]}
      </main>
    </div>
  );
};