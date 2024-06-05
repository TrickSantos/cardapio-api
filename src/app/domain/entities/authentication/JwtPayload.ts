export type JwtPayloadProps = {
    sub: string;
    username: string;
    email: string;
    organizationId: string;
};

export class JwtPayload {
    private props: JwtPayloadProps;

    constructor(props: JwtPayloadProps) {
        this.props = props;
    }

    get sub(): string {
        return this.props.sub;
    }

    get username(): string {
        return this.props.username;
    }

    get email(): string {
        return this.props.email;
    }

    get organizationId(): string {
        return this.props.organizationId;
    }

    toJSON() {
        return {
            sub: this.sub,
            username: this.username,
            email: this.email,
            organizationId: this.organizationId,
        };
    }
}
