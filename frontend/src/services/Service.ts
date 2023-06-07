/**
 * Service.ts: Common functionality for services
 */

export function getBackendDomain(): string {
    return process.env.REACT_APP_DOMAIN!;
}
