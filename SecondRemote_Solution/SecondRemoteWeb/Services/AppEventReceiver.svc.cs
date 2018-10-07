﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.SharePoint.Client;
using Microsoft.SharePoint.Client.EventReceivers;

namespace SecondRemoteWeb.Services
{
    public class AppEventReceiver : IRemoteEventService
    {
        /// <summary>
        /// Handles app events that occur after the app is installed or upgraded, or when app is being uninstalled.
        /// </summary>
        /// <param name="properties">Holds information about the app event.</param>
        /// <returns>Holds information returned from the app event.</returns>
        public SPRemoteEventResult ProcessEvent(SPRemoteEventProperties properties)
        {
            SPRemoteEventResult result = new SPRemoteEventResult();

            if (properties.EventType == SPRemoteEventType.AppInstalled)
            {
                using (ClientContext clientContext = TokenHelper.CreateAppEventClientContext(properties, false))
                {
                    if (clientContext != null)
                    {
                        //Get reference to the host web list with name Feedback
                        var documentsList = clientContext.Web.Lists.GetByTitle("Pages");
                        clientContext.Load(documentsList);
                        clientContext.ExecuteQuery();
                        string remoteUrl = "https://enjoysharepoint.azurewebsites.net/Services/RemoteEventReceiver1.svc";
                        // Create the remote event receiver definition
                        EventReceiverDefinitionCreationInformation newEventReceiver = new EventReceiverDefinitionCreationInformation()
                        {
                            EventType = EventReceiverType.ItemAdded,
                            ReceiverAssembly = this.Assembly.GetExecutingAssembly().FullName,
                            ReceiverName = "RemoteEventReceiver1",
                            ReceiverClass = "RemoteEventReceiver1",
                            ReceiverUrl = remoteUrl,
                            SequenceNumber = 15001
                        };
                        // Add the remote event receiver to the host web list
                        documentsList.EventReceivers.Add(newEventReceiver);
                        clientContext.ExecuteQuery();
                    }
                }
            }
            else if (properties.EventType == SPRemoteEventType.AppUninstalling)
            {
                using (ClientContext clientContext = TokenHelper.CreateAppEventClientContext(properties, false))
                {
                    var list = clientContext.Web.Lists.GetByTitle("DemoRemoteEventReceiverList");
                    clientContext.Load(list);
                    clientContext.ExecuteQuery();
                    EventReceiverDefinitionCollection erdc = list.EventReceivers;
                    clientContext.Load(erdc);
                    clientContext.ExecuteQuery();
                    List<EventReceiverDefinition> toDelete = new List<EventReceiverDefinition>();
                    foreach (EventReceiverDefinition erd in erdc)
                    {
                        if (erd.ReceiverName == "RemoteEventReceiver1")
                        {
                            toDelete.Add(erd);
                        }
                    }
                    //Delete the remote event receiver from the list, when the app gets uninstalled
                    foreach (EventReceiverDefinition item in toDelete)
                    {
                        item.DeleteObject();
                        clientContext.ExecuteQuery();
                    }
                }
            }
                //using (ClientContext clientContext = TokenHelper.CreateAppEventClientContext(properties, useAppWeb: false))
                //{
                //    if (clientContext != null)
                //    {
                //        clientContext.Load(clientContext.Web);
                //        clientContext.ExecuteQuery();
                //    }
                //}

            return result;
        }

        /// <summary>
        /// This method is a required placeholder, but is not used by app events.
        /// </summary>
        /// <param name="properties">Unused.</param>
        public void ProcessOneWayEvent(SPRemoteEventProperties properties)
        {
            throw new NotImplementedException();
        }

    }
}
