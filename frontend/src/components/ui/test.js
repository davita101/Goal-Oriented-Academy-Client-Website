"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUser = UpdateUser;
var sonner_1 = require("sonner");
var button_1 = require("@/components/ui/button");
function UpdateUser(_a) {
    var variant = _a.variant;
    var getCurrentTimestamp = function () { return new Date().toISOString(); };
    var handleAction = function () {
        var timestamp = getCurrentTimestamp();
        var message = "";
        var description = "";
        switch (variant) {
            case "add":
                message = "Account has been added";
                description = "createdAt: ".concat(timestamp);
                break;
            case "update":
                message = "Account has been updated";
                description = "updatedAt: ".concat(timestamp);
                break;
            case "delete":
                message = "Account has been deleted";
                description = "deletedAt: ".concat(timestamp);
                break;
            default:
                break;
        }
        (0, sonner_1.toast)(message, {
            description: description,
            action: {
                label: "Undo",
                onClick: function () { return console.log("Undo"); },
            },
        });
    };
    return (React.createElement(button_1.Button, { variant: "outline", onClick: handleAction },
        variant.charAt(0).toUpperCase() + variant.slice(1),
        " Account"));
}
