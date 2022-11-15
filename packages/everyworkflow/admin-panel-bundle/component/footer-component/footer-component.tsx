/*
 * @copyright EveryWorkflow. All rights reserved.
 */

const FooterComponent = () => {
    return (
        <div className="app-container app-panel-footer">
            <div>
                <div>
                    <p>
                        Copyright © EveryWorkflow. All rights reserved. <br />
                        <small>
                            Powered by:{' '}
                            <a
                                rel="noreferrer"
                                href="https://everyworkflow.com/"
                                target="_blank">
                                EveryWorkflow
                            </a>
                        </small>
                    </p>
                </div>
                <div>
                    <p>
                        <strong>v0.1.0-alpha</strong> <br />
                        <small>
                            <a
                                rel="noreferrer"
                                href="https://everyworkflow.com/report/"
                                target="_blank">
                                Report an issue?
                            </a>
                        </small>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FooterComponent;
