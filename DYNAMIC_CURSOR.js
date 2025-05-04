/******************************************************************************\
# JS - DYNAMIC_CURSOR                            #       Maximum Tension       #
################################################################################
#                                                #      -__            __-     #
# Teoman Deniz                                   #  :    :!1!-_    _-!1!:    : #
# maximum-tension.com                            #  ::                      :: #
#                                                #  :!:    : :: : :  :  ::::!: #
# +.....................++.....................+ #   :!:: :!:!1:!:!::1:::!!!:  #
# : C - Maximum Tension :: Create - 2025/05/04 : #   ::!::!!1001010!:!11!!::   #
# :---------------------::---------------------: #   :!1!!11000000000011!!:    #
# : License - MIT       :: Update - 2025/05/04 : #    ::::!!!1!!1!!!1!!!::     #
# +.....................++.....................+ #       ::::!::!:::!::::      #
\******************************************************************************/

var	DYNAMIC_CURSOR =
{
	SWING_ACTIVE: true,
	ROTATION: 0.0,
	TARGET_ROTATION: 0.0,
	MOUSE_X: window.innerWidth / 2,
	MOUSE_Y: window.innerHeight / 2,
	PIVOT_X: 0,
	PIVOT_Y: 0,
	DOM: undefined,
	STYLE: "default",
	SWING: true,
	CURSORS: {},
	MOUSE_OUT: true,
	RUN:
	function (CURSORS)
	{
		function
			ANIMATE()
		{
			if (THIS.SWING && THIS.SWING_ACTIVE)
			{
				let	ANGLE = THIS.TARGET_ROTATION - THIS.ROTATION;

				while (ANGLE > 3.1415926)
					ANGLE -= 6.2831852;

				while (ANGLE < -3.1415926)
					ANGLE += 6.2831852;

				THIS.ROTATION += ANGLE * 0.1;
				THIS.TARGET_ROTATION *= 0.7;
				THIS.DOM.style.transform =
					"TRANSLATE(" +
						(THIS.MOUSE_X - THIS.PIVOT_X) + "PX, " +
						(THIS.MOUSE_Y - THIS.PIVOT_Y) + "PX" +
					") " +
					"ROTATE(" + THIS.ROTATION + "RAD)";
			}
			else
			{
				THIS.DOM.style.transform =
					"TRANSLATE(" +
						(THIS.MOUSE_X - THIS.PIVOT_X) + "PX, " +
						(THIS.MOUSE_Y - THIS.PIVOT_Y) + "PX" +
					")";
			}

			requestAnimationFrame(ANIMATE);
		}

		const	THIS = this;

		THIS.CURSORS = CURSORS;
		THIS.DOM = document.createElement("IMG");
		THIS.DOM.alt = "Cursor";
		THIS.DOM.classList.add("DYNAMIC_CURSOR");
		THIS.DOM.style.width = THIS.CURSORS["default"].W + "PX";
		THIS.DOM.style.height = THIS.CURSORS["default"].H + "PX";
		THIS.DOM.style.opacity = 0;

		if (CURSORS["default"])
			THIS.DOM.src = CURSORS["default"]["SRC"];

		document.getElementsByTagName("BODY")[0].appendChild(THIS.DOM);
		document.addEventListener("mousemove",
			function (EVENT)
			{
				const	ELEMENT_STYLE = window.getComputedStyle(EVENT.target);
				const	CURSOR_STYLE = ELEMENT_STYLE.cursor;
				const	DELTA_X = THIS.MOUSE_X - EVENT.clientX;
				const	DELTA_Y = THIS.MOUSE_Y - EVENT.clientY;

				if (THIS.MOUSE_OUT)
				{
					THIS.MOUSE_OUT = false;
					THIS.DOM.style.opacity = 1;
				}

				THIS.MOUSE_X = EVENT.clientX;
				THIS.MOUSE_Y = EVENT.clientY;

				if (!THIS[CURSOR_STYLE])
				{
					const	MATCH =
						CURSOR_STYLE.match(/^url\(["']?(.*?)["']?\)/);

					if (MATCH)
					{
						const	[X, Y] =
							ELEMENT_STYLE.getPropertyValue(
								"transform-origin"
							).split(" ");

						THIS.DOM.style.width = ELEMENT_STYLE.width;
						THIS.DOM.style.height = ELEMENT_STYLE.height;
						THIS.PIVOT_X = parseFloat(X || "0");
						THIS.PIVOT_Y = parseFloat(Y || "0");
						THIS.SWING =
							(
								ELEMENT_STYLE.getPropertyValue(
									"--swing"
								).trim().toUpperCase() ||
								ELEMENT_STYLE.getPropertyValue(
									"--SWING"
								).trim().toUpperCase()
							) === "TRUE";
						THIS.DOM.src = MATCH[1];
						THIS.DOM.style.transformOrigin =
							(THIS.PIVOT_X + "PX " + THIS.PIVOT_Y + "PX");
					}
					else
					{
						THIS.DOM.style.width = THIS.CURSORS["default"].W + "PX";
						THIS.DOM.style.height =
							THIS.CURSORS["default"].H + "PX";
						THIS.PIVOT_X = THIS.CURSORS["default"].X || 0;
						THIS.PIVOT_Y = THIS.CURSORS["default"].Y || 0;
						THIS.SWING = THIS.CURSORS["default"].SWING;
						THIS.DOM.src = THIS.CURSORS["default"].SRC;
						THIS.DOM.style.transformOrigin =
							(THIS.PIVOT_X + "PX " + THIS.PIVOT_Y + "PX");
					}
				}
				else
				{
					THIS.DOM.style.width = THIS.CURSORS[CURSOR_STYLE].W + "PX";
					THIS.DOM.style.height = THIS.CURSORS[CURSOR_STYLE].H + "PX";
					THIS.PIVOT_X = THIS.CURSORS[CURSOR_STYLE].X || 0;
					THIS.PIVOT_Y = THIS.CURSORS[CURSOR_STYLE].Y || 0;
					THIS.SWING = THIS.CURSORS[CURSOR_STYLE].SWING;
					THIS.DOM.src = THIS.CURSORS[CURSOR_STYLE].SRC;
					THIS.DOM.style.transformOrigin =
						(THIS.PIVOT_X + "PX " + THIS.PIVOT_Y + "PX");
				}

				const LEVER_X =
					(THIS.CURSORS[THIS.STYLE].W / 2) - THIS.PIVOT_X;
				const LEVER_Y =
					(THIS.CURSORS[THIS.STYLE].H / 2) - THIS.PIVOT_Y;
				const TORQUE = (LEVER_X * DELTA_Y) - (LEVER_Y * DELTA_X);
				const LEVER_LENGTH = Math.hypot(LEVER_X, LEVER_Y) || 1;

				THIS.TARGET_ROTATION +=
					TORQUE / (LEVER_LENGTH * LEVER_LENGTH) * 0.9;

				while (THIS.TARGET_ROTATION > 3.1415926)
					THIS.TARGET_ROTATION -= 6.2831852;

				while (THIS.TARGET_ROTATION < -3.1415926)
					THIS.TARGET_ROTATION += 6.2831852;
			}
		);
		window.addEventListener("mouseout",
			function (EVENT)
			{
				if (
					!EVENT.relatedTarget ||
					EVENT.relatedTarget.nodeName === "HTML"
				)
				{
					THIS.MOUSE_OUT = true;
					THIS.DOM.style.opacity = 0;
				}
			}
		);

		ANIMATE();
	}
}
