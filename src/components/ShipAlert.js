import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { alertService, AlertType } from "../services";

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

function ShipAlert({ id = "default-alert", fade = true }) {
  const location = useLocation();
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Subscribe to alert service
    const subscription = alertService.onAlert(id).subscribe((alert) => {
      if (!alert.message) {
        setAlerts((alerts) => {
          const filteredAlerts = alerts.filter((x) => x.keepAfterRouteChange);
          filteredAlerts.forEach((x) => delete x.keepAfterRouteChange);
          return filteredAlerts;
        });
      } else {
        setAlerts((alerts) => [...alerts, alert]);
        if (alert.autoClose) {
          setTimeout(() => removeAlert(alert), 3000);
        }
      }
    });

    // Clear alerts on route change
    alertService.clear(id);

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, [id, location]); // Re-run effect on location change

  function removeAlert(alert) {
    if (fade) {
      const alertWithFade = { ...alert, fade: true };
      setAlerts((alerts) =>
        alerts.map((x) => (x === alert ? alertWithFade : x))
      );

      setTimeout(() => {
        setAlerts((alerts) => alerts.filter((x) => x !== alertWithFade));
      }, 250);
    } else {
      setAlerts((alerts) => alerts.filter((x) => x !== alert));
    }
  }

  function cssClasses(alert) {
    if (!alert) return;

    const classes = ["alert", "alert-dismissable"];

    const alertTypeClass = {
      [AlertType.Success]: "alert alert-success",
      [AlertType.Error]: "alert alert-danger",
      [AlertType.Info]: "alert alert-info",
      [AlertType.Warning]: "alert alert-warning",
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push("fade");
    }

    return classes.join(" ");
  }

  if (!alerts.length) return null;

  return (
    <div className="container">
      <div className="m-3">
        {alerts.map((alert, index) => (
          <div key={index} className={cssClasses(alert)}>
            <a className="close" onClick={() => removeAlert(alert)}>
              &times;
            </a>
            <span dangerouslySetInnerHTML={{ __html: alert.message }}></span>
          </div>
        ))}
      </div>
    </div>
  );
}

ShipAlert.propTypes = propTypes;

export { ShipAlert };
