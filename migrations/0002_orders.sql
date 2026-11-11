-- Commandes. Ajout seulement. Le catalogue et les tables existantes ne bougent pas.
create table if not exists orders (
  id uuid primary key,
  ref text not null unique,
  channel text not null check (channel in ('whatsapp', 'card')),
  status text not null check (status in (
    'intent', 'awaiting_payment', 'paid', 'access_granted', 'cancelled', 'refunded', 'revoked'
  )),
  product_id text not null,
  product_name text not null,
  amount_cents integer not null check (amount_cents > 0),
  period text,
  customer_name text,
  customer_phone text,
  customer_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_events (
  id bigint generated always as identity primary key,
  order_id uuid not null references orders (id),
  at timestamptz not null default now(),
  kind text not null,
  from_status text,
  to_status text,
  actor text not null,
  note text
);

create table if not exists payments (
  id uuid primary key,
  order_id uuid not null references orders (id),
  method text not null check (method in ('mobile_money', 'bank', 'stripe', 'other')),
  provider_ref text,
  amount_cents integer not null check (amount_cents > 0),
  status text not null check (status in ('declared', 'confirmed', 'failed', 'refunded')),
  confirmed_by text,
  declared_at timestamptz not null default now(),
  confirmed_at timestamptz
);

create table if not exists entitlements (
  id uuid primary key,
  order_id uuid not null references orders (id),
  product_id text not null,
  subject text,
  status text not null check (status in ('pending', 'active', 'revoked')),
  granted_at timestamptz,
  revoked_at timestamptz,
  reason text
);

create index if not exists orders_status_created_idx on orders (status, created_at desc);
create index if not exists order_events_order_idx on order_events (order_id, id);
