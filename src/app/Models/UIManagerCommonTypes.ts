

export class UIManagerCommonTypes_Command {
    CommandType: string;
    CommandData: string;
}

export class UIManagerCommonTypes_Notification {
    NotificationType: string;
    NotificationData: string;
}

class UIManagerCommonTypes_EntityData {
    EntityType: string;
    EntityDataObject: any;
}

export class COMMAND_TYPE {
    public static UI_CONTROL_PRESS: string = "UI_CONTROL_PRESS";
    public static UI_CONTROL_SHOW: string = "UI_CONTROL_SHOW";
    public static UI_CONTROL_HIDE: string = "UI_CONTROL_HIDE";
    public static UI_CONTROL_SELECT: string = "UI_CONTROL_SELECT";
}

export class COMMAND_DATA {
    public static SII_PROTOCOL_MANAGER: string = "SII_PROTOCOL_MANAGER";
    public static SII_SYSTEM_STEUP: string = "SII_SYSTEM_STEUP";
    public static SHARED_SIDEBAR_STARTUP_MENU: string = "SHARED_SIDEBAR_STARTUP_MENU";
    public static SHARED_CONSOLE_PWL: string = "SHARED_CONSOLE_PWL";
    public static SHARED_CONSOLE_FLUID_A_RECALL: string = "SHARED_CONSOLE_FLUID_A_RECALL";
    public static SII_LOCK: string = "SII_LOCK";
}

export class NOTIFICATION_TYPE {
    public POP_UP_OK: string = "POP_UP_OK";
    public POP_UP_OK_CANCEL: string = "POP_UP_OK_CANCEL";
    public POP_UP_YES_NO: string = "POP_UP_YES_NO";
    public UAR_OK: string = "UAR_OK";
    public UAR_OK_CANCEL: string = "UAR_OK_CANCEL";
    public UAR_WITHOUT_OK: string = "UAR_WITHOUT_OK";
    public CRITICAL_ERROR_SRU: string = "CRITICAL_ERROR_SRU";
    public CRITICAL_ERROR_WCRU: string = "CRITICAL_ERROR_WCRU";
    public EXCEPTION_ERROR: string = "EXCEPTION_ERROR";
}

export class NOTIFICATION_DATA {
    // UARs
    // Popup message

}

export class ENTITY_TYPE {
    public ALL_PROTOCOLS_DATA: string = "ALL_PROTOCOLS_DATA";
    public STANDARD_PROTOCOL: string = "STANDARD_PROTOCOL";
    public P3T_PROTOCOL: string = "P3T_PROTOCOL";
    public STANDARD_PROTOCOL_S: string = "STANDARD_PROTOCOL_S";
    public P3T_PROTOCOL_S: string = "P3T_PROTOCOL_S";
    public PATIENT_DATA: string = "PATIENT_DATA";
    public PATIENT_LIST_DATA: string = "PATIENT_LIST_DATA";
    public EXAM_DATA: string = "EXAM_DATA";
    public FLUID_S_DATA: string = "FLUID_S_DATA";
    public FLUID_DATA: string = "FLUID_DATA";
    public SYSTEM_SETUP_DATA: string = "SYSTEM_SETUP_DATA";
    public INFORMATICS_SETUP_DATA: string = "INFORMATICS_SETUP_DATA";
    public P3T_PRESET_SETUP_DATA: string = "P3T_PRESET_SETUP_DATA";
    public FLUID_DELIVERY_SETUP_DATA: string = "FLUID_DELIVERY_SETUP_DATA";
    public SOFTWARE_VERSIONS: string = "SOFTWARE_VERSIONS";
    public FLUID_A_RECALL_DATA: string = "FLUID_A_RECALL_DATA";
}

